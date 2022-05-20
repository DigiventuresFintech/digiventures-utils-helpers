'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var awsSdk = require('aws-sdk');
var log4js = _interopDefault(require('log4js'));

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class SecretManager {
  constructor() {
    this.logger = log4js.getLogger("SecretManager");
    this.region = "us-east-1";

    this.getSecret = async secretArn => {
      return new Promise((resolve, reject) => {
        this.secretsManager.getSecretValue({
          SecretId: secretArn
        }, (err, data) => {
          if (err) {
            this.logger.error(err);
            reject(err);
            return;
          }

          let res;

          if ("SecretString" in data) {
            res = data.SecretString;
          } else {
            res = Buffer.from(data.SecretBinary, "base64").toString("ascii");
          }

          try {
            resolve(JSON.parse(res));
          } catch (e) {
            this.logger.error(e);
            reject(e);
            return;
          }
        });
      });
    };

    this.secretsManager = new awsSdk.SecretsManager({
      region: process.env.AWS_REGION || this.region
    });
  }

}

class ConfigLoader {
  constructor() {
    this.logger = log4js.getLogger("ConfigLoader");
    this.references = {
      production: "prod",
      develop: "dev"
    };
    this.secrets = process.env.API_CONFIGURATION_SECRETS || "";
    this.env = process.env.ENVIRONMENT;
  }
  /**
   * SecretsLoader loads a list of secret manager by comma separated config, filtering by env
   */


  async secretsLoader() {
    const ref = this.env ? this.references[this.env] : undefined;
    const secretManager = new SecretManager();

    if (ref) {
      this.logger.trace("loading secrets for environment", ref);
      const pending = this.secrets.split(",").filter(v => v.includes(ref)).map(v => v.endsWith(",") ? v.substring(0, v.length - 1) : v).map(v => secretManager.getSecret(`${v}`));
      await Promise.all(pending).then(res => {
        process.env = _objectSpread2(_objectSpread2({}, process.env), res);
      }).catch(err => {
        this.logger.error("error loading secret configuration", err);
      });
    }
  }

}

exports.ConfigLoader = ConfigLoader;
//# sourceMappingURL=index.js.map

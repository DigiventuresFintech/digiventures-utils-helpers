import mongoose, { Schema } from 'mongoose';

export interface Trigger extends mongoose.Document {
  provider: string;
  source: string;
  action: string;
  notifierId: mongoose.Types.ObjectId;
  validations: any;
  validations_keys?: string[];
  external_validations_keys?: string[];
  enable: boolean;
}

export interface ReferenceKeyFormat {
  keys: Set<string>;
  transformed: string;
}

export type ExternalReferenceFormat = Record<string, string>;

export function getValidationKeys(trigger: Trigger): void {
  trigger.validations_keys = [];

  if (trigger.validations) {
    try {
      const validationsString = JSON.stringify(trigger.validations);

      let match;
      while ((match = /"var":\s*"([^"]+)"/g.exec(validationsString)) !== null) {
        trigger.validations_keys.push(match[1]);
      }
    } catch (_) {}
  }
}

export function mergeValidationsKeys(
  triggers: Trigger[],
  data: any,
): ReferenceKeyFormat {
  if (!triggers || triggers.length === 0) {
    return {
      keys: new Set(),
      transformed: '',
    };
  }

  const keys = triggers.reduce((output: Set<string>, trigger) => {
    if (trigger.validations_keys) {
      trigger.validations_keys.forEach(key => {
        if (data[key] === undefined) {
          output.add(key);
        }
      });
    }
    return output;
  }, new Set<string>());

  return {
    keys,
    transformed: Array.from(keys.keys()).join(' '),
  };
}

export function mergeExternalValidationsKeys(
  triggers: Trigger[],
): ExternalReferenceFormat {
  if (!triggers || triggers.length === 0) {
    return {};
  }

  const keysMap = triggers.reduce((acc, trigger: Trigger) => {
    if (trigger.external_validations_keys) {
      trigger.external_validations_keys.forEach(reference => {
        const [firstPart, secondPart] = reference.split('.', 2);
        if (firstPart && secondPart) {
          if (!acc[firstPart]) {
            acc[firstPart] = new Set<string>();
          }
          acc[firstPart].add(secondPart);
        }
      });
    }
    return acc;
  }, {} as Record<string, Set<string>>);

  return Object.keys(keysMap).reduce((result, key) => {
    result[key] = Array.from(keysMap[key]).join(' ');
    return result;
  }, {} as Record<string, string>);
}

export const CreateTriggerSchema = () => {
  return new Schema({
    provider: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    notifierId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    validations: {
      type: Schema.Types.Mixed,
      required: true,
    },
    validations_keys: {
      type: [String],
    },
    external_validations_keys: {
      type: [String],
    },
    enable: {
      type: Boolean,
      default: true,
    },
  });
};

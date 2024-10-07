import { Document, Schema } from 'mongoose';

export interface IBuyer extends Document {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  birth_day?: Date;
  picture?: string;
  language?: string;
  password?: string;
  age_declared?: number;
  email?: {
    type?: string;
    value?: string;
    verified?: boolean;
    verified_date?: Date;
    verify_code_creation_date?: Date;
    verify_code?: string;
    pending_tries?: number;
  };
  phone?: {
    type?: string;
    value?: string;
    verified?: boolean;
    verified_date?: Date;
    verify_code_creation_date?: Date;
    verify_code?: number;
    pending_sms_tries?: number;
    forgotten?: boolean;
  };
  identification?: {
    type?: string;
    value?: string;
    verified?: boolean;
    dataset?: any;
    verified_date?: Date;
  };
  label?: string;
  identifications?: {
    type?: string;
    value?: string;
    verified?: boolean;
    dataset?: any;
    verified_date?: Date;
  }[];
  phones?: {
    type?: string;
    value?: string;
    verified?: boolean;
    verified_date?: Date;
  }[];
  emails?: {
    value?: string;
    verified?: boolean;
    verified_date?: Date;
  }[];
  owners?: {
    _id?: string;
    name?: string;
    email?: string;
  }[];
  legajos?: any[];
  google?: {
    id?: string;
    domain?: string;
    verified?: boolean;
    verified_date?: Date;
    verify_code_creation_date?: Date;
    verify_code?: number;
    pending_sms_tries?: number;
  };
  facebook?: {
    id?: string;
    verified?: boolean;
    verified_date?: Date;
    verify_code_creation_date?: Date;
    verify_code?: number;
    pending_sms_tries?: number;
  };
  country?: {
    short_code?: string;
    name?: string;
    address_province?: string;
    address_city?: string;
  };
  third_parties?: {
    ekomi?: any;
    sendgrid?: any;
    notifications?: {
      id?: string;
      name?: string;
      date?: Date;
      action?: string;
      templateId?: string;
      ekomiProject?: string;
    }[];
  };
  status?: string;
  credit_profile?: {
    type?: string;
    origin?: string;
    reason?: string;
    history?: {
      date?: Date;
      status?: string;
      source?: string;
    }[];
    expiration_date_siisa?: Date;
    expiration_date_findoctor?: Date;
    score?: any;
    my_account_score?: string;
    digi_score?: {
      date?: Date;
      status?: string;
    }[];
    declared_info?: {
      age?: number;
      birthdate?: Date;
      relationship_work?: string;
    };
    nosis_score?: any;
    trace?: string;
  };
  relationships_work?: {
    dependent?: {
      status?: boolean;
      tags?: string[];
    };
    independent?: {
      status?: boolean;
      tags?: string[];
    };
    retired?: {
      status?: boolean;
      tags?: string[];
    };
  };
  monthly_income?: {
    declarative?: number;
    service?: any;
  };
  expenses?: any;
  debts?: {
    entity?: string;
    date?: Date;
    amount?: string;
  }[];
  events?: {
    stepId?: string;
    date?: Date;
    type?: string;
    event?: any;
  }[];
  last_login?: {
    date?: Date;
    type?: string;
  };
  stats?: {
    viewContent?: {
      count?: number;
      lastDate?: string;
      firstDate?: string;
      lastDateIso?: Date;
    };
    lowProfile?: {
      count?: number;
      lastDate?: string;
      firstDate?: string;
    };
    unknownProfile?: {
      count?: number;
      lastDate?: string;
      firstDate?: string;
    };
    addToCartMP?: {
      count?: number;
      lastDate?: string;
      firstDate?: string;
    };
    initiateCheckout?: {
      urlRedirect?: string;
      click?: boolean;
      date?: string;
      productName?: string;
    };
    ekomi?: {
      MPdate?: string;
      PRdate?: string;
    };
    productsDeclared?: {
      date?: string;
      id?: string;
      name?: string;
      type?: string;
    }[];
    email?: {
      open?: {
        status?: boolean;
        date?: Date;
      };
    };
    signup?: {
      date?: string;
      dateIso?: Date;
    };
  };
  tyc?: {
    text?: string;
    date?: Date;
  };
  tags?: string[];
}

export const CreateBuyerSchema = () => {
  return new Schema({
    full_name: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    birth_day: { type: Date },
    picture: { type: String },
    language: { type: String },
    password: { type: String },
    age_declared: { type: Number },
    email: {
      type: { type: String },
      value: { type: String, unique: true, sparse: true },
      verified: { type: Boolean },
      verified_date: { type: Date },
      verify_code_creation_date: { type: Date },
      verify_code: { type: String },
      pending_tries: { type: Number },
    },
    phone: {
      type: { type: String },
      value: { type: String, unique: true, sparse: true },
      verified: { type: Boolean },
      verified_date: { type: Date },
      verify_code_creation_date: { type: Date },
      verify_code: { type: Number },
      pending_sms_tries: { type: Number },
      forgotten: { type: Boolean },
    },
    identification: {
      type: { type: String },
      value: { type: String, unique: true, sparse: true },
      verified: { type: Boolean },
      dataset: { type: Schema.Types.Mixed },
      verified_date: { type: Date },
    },
    label: { type: String },
    identifications: [
      {
        type: { type: String },
        value: { type: String },
        verified: { type: Boolean },
        dataset: { type: Schema.Types.Mixed },
        verified_date: { type: Date },
      },
    ],
    phones: [
      {
        type: { type: String },
        value: { type: String },
        verified: { type: Boolean },
        verified_date: { type: Date },
      },
    ],
    emails: [
      {
        value: { type: String },
        verified: { type: Boolean },
        verified_date: { type: Date },
      },
    ],
    owners: [
      {
        _id: { type: String },
        name: { type: String },
        email: { type: String },
      },
    ],
    legajos: [],
    google: {
      id: { type: String },
      domain: { type: String },
      verified: { type: Boolean },
      verified_date: { type: Date },
      verify_code_creation_date: { type: Date },
      verify_code: { type: Number },
      pending_sms_tries: { type: Number },
    },
    facebook: {
      id: { type: String },
      verified: { type: Boolean },
      verified_date: { type: Date },
      verify_code_creation_date: { type: Date },
      verify_code: { type: Number },
      pending_sms_tries: { type: Number },
    },
    country: {
      short_code: { type: String },
      name: { type: String },
      address_province: { type: String },
      address_city: { type: String },
    },
    third_parties: {
      ekomi: { type: Schema.Types.Mixed },
      sendgrid: { type: Schema.Types.Mixed },
      notifications: [
        {
          id: { type: String },
          name: { type: String },
          date: { type: Date },
          action: { type: String },
          templateId: { type: String },
          ekomiProject: { type: String },
        },
      ],
    },
    status: { type: String },
    credit_profile: {
      type: { type: String },
      origin: { type: String },
      reason: { type: String },
      history: [
        {
          date: { type: Date },
          status: { type: String },
          source: { type: String },
        },
      ],
      expiration_date_siisa: { type: Date },
      expiration_date_findoctor: { type: Date },
      score: { type: Schema.Types.Mixed },
      my_account_score: { type: String },
      digi_score: [
        {
          date: { type: Date },
          status: { type: String },
        },
      ],
      declared_info: {
        age: { type: Number },
        birthdate: { type: Date },
        relationship_work: { type: String },
      },
      nosis_score: { type: Schema.Types.Mixed },
      trace: { type: String },
    },
    relationships_work: {
      dependent: {
        status: { type: Boolean },
        tags: [{ type: String }],
      },
      independent: {
        status: { type: Boolean },
        tags: [{ type: String }],
      },
      retired: {
        status: { type: Boolean },
        tags: [{ type: String }],
      },
    },
    monthly_income: {
      declarative: { type: Number },
      service: { type: Schema.Types.Mixed },
    },
    expenses: { type: Schema.Types.Mixed },
    debts: [
      {
        entity: { type: String },
        date: { type: Date },
        amount: { type: String },
      },
    ],
    events: [
      {
        stepId: { type: String },
        date: { type: Date },
        type: { type: String },
        event: { type: Schema.Types.Mixed },
      },
    ],
    last_login: {
      date: { type: Date },
      type: { type: String },
    },
    stats: {
      viewContent: {
        count: { type: Number },
        lastDate: { type: String },
        firstDate: { type: String },
        lastDateIso: { type: Date },
      },
      lowProfile: {
        count: { type: Number },
        lastDate: { type: String },
        firstDate: { type: String },
      },
      unknownProfile: {
        count: { type: Number },
        lastDate: { type: String },
        firstDate: { type: String },
      },
      addToCartMP: {
        count: { type: Number },
        lastDate: { type: String },
        firstDate: { type: String },
      },
      initiateCheckout: {
        urlRedirect: { type: String },
        click: { type: Boolean },
        date: { type: String },
        productName: { type: String },
      },
      ekomi: {
        MPdate: { type: String },
        PRdate: { type: String },
      },
      productsDeclared: [
        {
          date: { type: String },
          id: { type: String },
          name: { type: String },
          type: { type: String },
        },
      ],
      email: {
        open: {
          status: { type: Boolean },
          date: { type: Date },
        },
      },
      signup: {
        date: { type: String },
        dateIso: { type: Date },
      },
    },
    tyc: {
      text: { type: String },
      date: { type: Date },
    },
    tags: [{ type: String, default: [] }],
  });
};

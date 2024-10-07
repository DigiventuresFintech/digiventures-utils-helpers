import mongoose, { Document, Schema } from 'mongoose';

export interface ITenant extends Document {
  subdomain: string;
  name: string;
  account?: string;
  campaign?: string;
  description?: string;
  title: string;
  steps?: Record<string, any>;
  constants?: Record<string, any>;
  products?: {
    title?: string;
    subtitle?: string;
    groupId?: string;
    image?: string;
    tyc?: string;
    info?: string;
    buttonModalText?: string;
    conditions?: {
      label?: string;
    };
    externalId?: string;
    _id?: string;
    filter?: {
      path?: string;
      comparision?: string;
      value?: string;
    };
    benefits?: {
      tab?: string;
      tips?: {
        color?: string;
        text?: string;
      }[];
    }[];
    documents?: {
      title?: string;
      download_text?: string;
      link_text?: string;
      items?: {
        _id?: string;
        title?: string;
        subtitle?: string;
        content?: string;
        read?: boolean;
      }[];
    };
    products_details?: {
      title?: string;
      review?: string;
    };
    additional_products?: {
      title?: string;
      subtitle?: string;
      buttonModalText?: string;
      filter?: {
        path?: string;
        comparision?: string;
        value?: string;
      };
      items?: {
        content?: string;
      }[];
      documents?: {
        title?: string;
        subtitle?: string;
        content?: string;
      }[];
      checkboxes?: {
        title?: string;
        checkboxLabel?: string;
        type?: string;
      }[];
    }[];
    render?: {
      color?: string;
      headerLogo?: string;
      contactless?: string;
      chip?: boolean;
      rightLogo?: string;
      number?: string;
      customHTML?: string;
    };
  }[];
  links?: Record<string, any>;
  tests?: { name: string; test: string }[];
  workspace?: string;
  cookies?: string;
  tags?: string[];
  versions?: Record<string, any>[];
  features?: string[];
  journey?: {
    start?: string;
    transitions?: Map<string, any>;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export const CreateTenantSchema = () => {
  return new Schema(
    {
      subdomain: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      name: { type: String, required: true, index: true },
      account: String,
      campaign: String,
      description: String,
      title: { type: String, required: true },
      steps: { type: Schema.Types.Mixed, default: {} },
      constants: { type: Schema.Types.Mixed, default: {} },
      // products: { type: Schema.Types.Mixed, default: [] },
      products: [
        {
          title: { type: String, default: '' },
          subtitle: { type: String, default: '' },
          groupId: { type: String, default: '' },
          image: { type: String, default: '' },
          tyc: { type: String, default: '' },
          info: { type: String, default: '' },
          buttonModalText: { type: String, default: '' },
          conditions: {
            label: { type: String, default: '' },
          },
          externalId: String,
          _id: String,
          filter: {
            path: { type: String, default: '' },
            comparision: { type: String, default: '' },
            value: { type: String, default: '' },
          },
          benefits: [
            {
              tab: { type: String, default: '' },
              tips: [
                {
                  color: { type: String, default: '' },
                  text: { type: String, default: '' },
                },
              ],
            },
          ],
          documents: {
            title: { type: String, default: '' },
            download_text: { type: String, default: '' },
            link_text: { type: String, default: '' },
            items: [
              {
                _id: { type: String, default: '' },
                title: { type: String, default: '' },
                subtitle: { type: String, default: '' },
                content: { type: String, default: '' },
                read: { type: Boolean, default: false },
              },
            ],
          },
          products_details: {
            title: { type: String, default: '' },
            review: { type: String, default: '' },
          },
          additional_products: [
            {
              title: { type: String, default: '' },
              subtitle: { type: String, default: '' },
              buttonModalText: { type: String, default: '' },
              filter: {
                path: { type: String, default: '' },
                comparision: { type: String, default: '' },
                value: { type: String, default: '' },
              },
              items: [
                {
                  content: { type: String, default: '' },
                },
              ],
              documents: [
                {
                  title: { type: String, default: '' },
                  subtitle: { type: String, default: '' },
                  content: { type: String, default: '' },
                },
              ],
              checkboxes: [
                {
                  title: { type: String, default: '' },
                  checkboxLabel: {
                    type: String,
                    default: '',
                  },
                  type: { type: String, default: '' },
                },
              ],
            },
          ],
          render: {
            color: { type: String, default: '' },
            headerLogo: { type: String, default: '' },
            contactless: { type: String, default: '' },
            chip: { type: Boolean, default: false },
            rightLogo: { type: String, default: '' },
            number: { type: String, default: '' },
            customHTML: { type: String, default: '' },
          },
        },
      ],
      links: { type: Schema.Types.Mixed, default: {} },
      tests: [{ name: String, test: String }],
      workspace: { type: String, default: '' },
      cookies: String,
      tags: [{ type: String, default: [] }],
      versions: { type: Schema.Types.Mixed, default: [] },
      features: [{ type: String, default: [] }],
      journey: {
        start: { type: String, default: '' },
        transitions: { type: Map, of: Object, default: {} },
      },
    },
    {
      timestamps: true,
    },
  );
};

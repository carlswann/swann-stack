import { TranslationKey } from 'locales';
import { BASE_ROUTE, LOGIN_ROUTE } from 'config/constants/routes';

import SvgIcon from '@mui/material/SvgIcon';

import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import TagIcon from '@mui/icons-material/Tag';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RuleIcon from '@mui/icons-material/Rule';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';

export type Route = {
  id: string;
  translationKey: TranslationKey;
  // Caption shows right under the group name
  captionTranslationKey?: TranslationKey;
  // Group is not a link. Just a grouping
  // Item is a link
  // Collapse is a dropdown
  type: 'group' | 'item' | 'collapse';
  url?: string;
  icon?: typeof SvgIcon;
  target?: '_self' | '_blank';
  // URL is outside the domain
  external?: boolean;
  disabled?: boolean;
  // Hide from main menu
  hide?: boolean;
  // Set to false to disable breadcrumbs
  breadcrumbs?: boolean;
  children?: Record<string, Route>;
};
export type Routes = typeof routes;

export const routes: Record<string, Route> = {
  base: {
    id: 'base',
    translationKey: 'generic.routes.base.title',
    type: 'item',
    url: BASE_ROUTE,
    hide: true,
  },
  authentication: {
    id: 'authentication',
    translationKey: 'generic.routes.authentication.title',
    type: 'group',
    hide: true,
    children: {
      login: {
        id: 'authentication.login',
        translationKey: 'generic.routes.authentication.login.title',
        type: 'item',
        url: LOGIN_ROUTE,
      },
    },
  },
  catalog: {
    id: 'catalog',
    translationKey: 'generic.routes.catalog.title',
    captionTranslationKey: 'generic.routes.catalog.caption',
    type: 'group',
    children: {
      products: {
        id: 'products',
        translationKey: 'generic.routes.catalog.products.title',
        type: 'item',
        url: '/catalog/products',
        icon: InventoryIcon,
        disabled: true,
      },
      categories: {
        id: 'categories',
        translationKey: 'generic.routes.catalog.categories.title',
        type: 'item',
        url: '/catalog/categories',
        icon: CategoryIcon,
      },
      tags: {
        id: 'tags',
        translationKey: 'generic.routes.catalog.tags.title',
        type: 'item',
        url: '/catalog/tags',
        icon: TagIcon,
        children: {
          create: {
            id: 'create',
            translationKey: 'generic.routes.catalog.tags.create.title',
            type: 'item',
            url: '/catalog/tags/create',
          },
        },
      },
      import: {
        id: 'import',
        translationKey: 'generic.routes.catalog.import.title',
        type: 'collapse',
        icon: UploadFileIcon,
        children: {
          new: {
            id: 'new-products',
            translationKey: 'generic.routes.catalog.import.new.title',
            type: 'item',
            url: '/catalog/import/new-products',
            disabled: true,
          },
          update: {
            id: 'product-updates',
            translationKey: 'generic.routes.catalog.import.update.title',
            type: 'item',
            url: '/catalog/import/product-updates',
            disabled: true,
          },
        },
      },
    },
  },
  pricing: {
    id: 'pricing',
    translationKey: 'generic.routes.pricing.title',
    captionTranslationKey: 'generic.routes.pricing.caption',
    type: 'group',
    children: {
      validation: {
        id: 'validation',
        translationKey: 'generic.routes.pricing.validation.title',
        type: 'item',
        url: '/pricing/validation',
        icon: RuleIcon,
        disabled: true,
      },
    },
  },
  integration: {
    id: 'integration',
    translationKey: 'generic.routes.integration.title',
    captionTranslationKey: 'generic.routes.integration.caption',
    type: 'group',
    children: {
      attributes: {
        id: 'attributes',
        translationKey: 'generic.routes.integration.attributes.title',
        type: 'item',
        url: '/integration/attributes',
        icon: DynamicFormIcon,
      },
    },
  },
};

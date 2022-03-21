// TODO We need a more elegant way to create the namespace using the directories. It should automatically tranverse

// Generic
import formValidation from './generic/formValidation.json';
import routes from './generic/routes.json';

// Layout
import HeaderProfile from './layouts/components/HeaderProfile.json';

// Pages
import NotFound from './pages/NotFound.json';

// Components
import Form from './components/forms/Form.json';
import GridToolbarRefreshButton from './components/GridToolbarRefreshButton.json';
import GridToolbarSearch from './components/GridToolbarSearch.json';

// Authentication Module
import Login from './modules/authentication/pages/Login.json';
import LoginForm from './modules/authentication/components/LoginForm.json';

// Tags Module
import TagsTable from './modules/tags/components/TagsTable.json';
import TagForm from './modules/tags/components/forms/TagForm.json';

// Attributes Module
import AttributesTable from './modules/attributes/components/AttributesTable.json';

// Categories Module
import CategoriesTable from './modules/categories/components/CategoriesTable.json';

const enUsNamespaces = {
  generic: {
    formValidation,
    routes,
  },
  layouts: {
    components: {
      HeaderProfile,
    },
  },
  pages: {
    NotFound,
  },
  components: {
    forms: {
      Form,
    },
    GridToolbarRefreshButton,
    GridToolbarSearch,
  },
  modules: {
    authentication: {
      components: {
        LoginForm,
      },
      pages: {
        Login,
      },
    },
    tags: {
      components: {
        TagsTable,
        forms: {
          TagForm,
        },
      },
      forms: {
        TagForm,
      },
    },
    attributes: {
      components: {
        AttributesTable,
      },
    },
    categories: {
      components: {
        CategoriesTable,
      },
    },
  },
};

export default enUsNamespaces;

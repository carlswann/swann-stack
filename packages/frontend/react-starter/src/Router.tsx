import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from 'routes';
import { CATCH_ALL_ROUTE } from 'config/constants/routes';

import { Loadable } from 'components/layout/Loadable';

// Layouts
import { GuestLayout } from 'layouts/GuestLayout';
import { AuthenticatedLayout } from 'layouts/AuthenticatedLayout';

// Authentication module pages
const Login = Loadable(React.lazy(() => import('modules/authentication/pages/Login')));

// Categories module pages
const ListCategories = Loadable(React.lazy(() => import('modules/categories/pages/ListCategories')));

// Tags module pages
const ListTags = Loadable(React.lazy(() => import('modules/tags/pages/ListTags')));
const CreateTag = Loadable(React.lazy(() => import('modules/tags/pages/CreateTag')));

// Attributes module pages
const ListAttributes = Loadable(React.lazy(() => import('modules/attributes/pages/ListAttributes')));

// Common pages
const NotFound = Loadable(React.lazy(() => import('pages/NotFound')));

function Router() {
  return (
    <Routes>
      {/* Authenticated Routes */}
      <Route path={routes.base.url} element={<AuthenticatedLayout />}>
        <Route>
          <Route path={routes.catalog.children?.categories.url} element={<ListCategories />} />

          <Route path={routes.catalog.children?.tags.url} element={<ListTags />} />
          <Route path={routes.catalog.children?.tags.children?.create.url} element={<CreateTag />} />

          <Route path={routes.integration.children?.attributes.url} element={<ListAttributes />} />

          <Route path={CATCH_ALL_ROUTE} element={<NotFound />} />
        </Route>
      </Route>

      <Route path={routes.base.url} element={<GuestLayout />}>
        <Route path={routes.authentication.children?.login.url} element={<Login />} />

        <Route path={CATCH_ALL_ROUTE} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;

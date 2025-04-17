import { Outlet } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader.js';
import PageLayout from "../PageLayout/PageLayout.js";

function AppLayout() {
    return (
        <>
            <AppHeader />
            <PageLayout>
                <Outlet />
            </PageLayout>
        </>
    );
};

export default AppLayout;
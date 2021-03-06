import { LayoutComponent } from '../layout/layout.component';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'leads', loadChildren: '../leads/leads.module#LeadsModule' },
            { path: 'material', loadChildren: './material/material.module#MaterialModule' },
        ]
    },

    // Not found
    { path: '**', redirectTo: 'home' }

];

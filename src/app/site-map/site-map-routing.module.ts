import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelayProjectListComponent } from './relay-site-map/relay-project-list/relay-project-list.component';
import { RelaySiteMapComponent } from './relay-site-map/relay-site-map.component';
import { SiteMapComponent } from './site-map.component';

const routes: Routes = [
    {
        path: '',
        component: SiteMapComponent,
        children: [
            {
                path: 'relay',
                component: RelaySiteMapComponent
            },
            {
                path: 'relay-projects',
                component: RelayProjectListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteMapRoutingModule { }

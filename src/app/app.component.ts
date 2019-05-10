import { Component, HostBinding, OnInit } from '@angular/core';
import { SettingsService } from './core/settings/settings.service';
import { Store } from '@ngrx/store';
import * as fromAccount from './account/reducers';
import { Login } from './account/actions/user.actions';
import { v4 as uuid } from 'uuid';
import { Role } from './account/models/roles.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @HostBinding('class.layout-fixed') get isFixed() { return this.settings.getLayoutSetting('isFixed'); };
    @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.getLayoutSetting('isCollapsed'); };
    @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.getLayoutSetting('isBoxed'); };
    @HostBinding('class.layout-fs') get useFullLayout() { return this.settings.getLayoutSetting('useFullLayout'); };
    @HostBinding('class.hidden-footer') get hiddenFooter() { return this.settings.getLayoutSetting('hiddenFooter'); };
    @HostBinding('class.layout-h') get horizontal() { return this.settings.getLayoutSetting('horizontal'); };
    @HostBinding('class.aside-float') get isFloat() { return this.settings.getLayoutSetting('isFloat'); };
    @HostBinding('class.offsidebar-open') get offsidebarOpen() { return this.settings.getLayoutSetting('offsidebarOpen'); };
    @HostBinding('class.aside-toggled') get asideToggled() { return this.settings.getLayoutSetting('asideToggled'); };
    @HostBinding('class.aside-collapsed-text') get isCollapsedText() { return this.settings.getLayoutSetting('isCollapsedText'); };

    constructor(
        public settings: SettingsService,
        private store: Store<fromAccount.State>,
    ) { }

    ngOnInit() {
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A') e.preventDefault();
        })

        this.store.dispatch(new Login(
            [{
                userId: uuid(),
                name: "ana",
                isAuthenticated: true,
                role: Role.Agent,
                picture: "assets/img/user/01.jpg"
            }]
        ))
    }
}

# typescript-app-template

Template typescript application with a web, mobile, and desktop app.

Built with Next.js, Expo, Tauri, tRPC, Tailwind CSS, and Drizzle ORM.

## setup

-   this repo contains the following apps, remove any you don't intend to use
    -   mobile: `apps/mobile`
    -   desktop: `apps/desktop`
    -   web: `apps/web`
-   find/replace `ptat` with your app name
-   find/replace `example.com` with your org domain
-   find/replace `com.example` with your org reverse domain
-   consider replacing license in `package.json`

### mobile

-   setup app icon
    -   create app icon (expo provides a figma template and icon best practises
        here: https://docs.expo.dev/develop/user-interface/app-icons/)
    -   replace files in `apps/mobile/assets/images/` (with files exported from
        figma)
        -   `adaptive-icon.png`
        -   `icon.png`
        -   `splash.png`
    -   replace mobile icon/splash background color in `apps/mobile/app.json`
        -   `.expo.splash.backgroundColor`
        -   `.expo.android.adaptiveIcon.backgroundColor`

### web

-   setup app icon
    -   create `favicon.ico` from your app icon (many tools exist online to do
        this): `apps/web/src/app/favicon.ico`

### desktop

-   setup app icon
    -   generate desktop icons
        ```bash
        cd apps/desktop
        npx tauri icon ~/Downloads/your-icon.png
        cd ../..
        ```

---

# ptat

## Local dev

-   `./bin/dev initial setup`
-   run the following commands AND append to your shell configs (ie. `~/.zshrc`
    or `~/.bashrc`/`~/.bash_profile`)

```bash
eval "$(rtx activate zsh)"
# or for bash
# eval "$(rtx activate bash)"
source "$HOME/.cargo/env"
```

-   (optionally) configure rtx: `~/.config/rtx/config.toml`

```toml
[settings]
missing_runtime_behavior = "autoinstall"
trusted_config_paths = ["~/Projects"] # where ~/Projects is wherever you clone your repos
```

-   `dev start`

###### Bootstrapped with [pentible/typescript-app-template](https://github.com/pentible/typescript-app-template)

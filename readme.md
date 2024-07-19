# typescript-app-template

Template typescript application with a web, mobile, and desktop app.

Built with Next.js, Expo, Tauri, tRPC, Tailwind CSS, Prisma, and Neon DB.

## setup

-   this repo contains the following apps, remove any you don't intend to use
    -   mobile: `apps/mobile`
    -   desktop: `apps/desktop`
    -   web: `apps/web`
-   remove references to any removed apps from `tsconfig.json`
-   find/replace `ptat` with your app name
-   find/replace `example.com` with your org domain
-   find/replace `com.example` with your org reverse domain
-   consider replacing license in `package.json`
-   `./bin/dev setup`

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

-   setup sops (for encrypted env vars)

    -   create secret key

        ```bash
        declare name='ptat'
        
        # create key
        age-keygen -o "${HOME}/${name}.private"
        
        # save secret key to global sops config
        declare sops_age_dir="${HOME}/Library/Application Support/sops/age"
        mkdir -p "$sops_age_dir"
        cat "${HOME}/${name}.private" >> "${sops_age_dir}/keys.txt"
        ```

    -   save secret key to your password manager (so you don't lose it, and can
        share with your team)

        -   replace `your password manager` below in readme with the name of
            your password manager (ie. `1password`) as well as updating the
            associated link to point at the shared secret key

    -   replace `age-key` in `.sops.yaml` with your public key

    -   create production env file: `dev env edit prod` (or in vscode:
        `EDITOR='code --wait' dev env edit prod`)

        ```yaml
        DATABASE_URL: postgres://ptat:password@localhost:5432/ptat
        # NOTE: you can append `_unencrypted` to keys which you don't want encrypted
        APP_URL_unencrypted: https://ptat.example.com
        ```

    -   create preview env file: `dev env edit preview` (or in vscode:
        `EDITOR='code --wait' dev env edit preview`)

        ```yaml
        # NOTE: DATABASE_URL & APP_URL are generated dynamically for the preview env and don't need to be here, thus you can just enter `{}` until you have actual envs to enter
        {}
        ```

    -   commit new secret files

-   setup github actions secrets (for deploy script)
    -   `NEON_API_KEY` (create here
        https://console.neon.tech/app/settings/api-keys)
    -   `SOPS_AGE_KEY` (your sops private key, created above)
    -   `VERCEL_ORG_ID` (aka `Vercel ID` from https://vercel.com/account)
    -   `VERCEL_TOKEN` (create here https://vercel.com/account/tokens)
-   setup github actions vars (for deploy script)

    > NOTE: we setup these values as vars because they show up in urls/etc, so
    > it's pretty annoying if they get masked out

    -   `NEON_PROJECT_ID` (in your project's `Settings`
        https://console.neon.tech/app/projects)
    -   `NEON_DATABASE_USERNAME` (ie. the name of one of your projects roles)
    -   `VERCEL_SCOPE` (your vercel team, or personal account name)

-   setup neon db
    -   create a database in your project `neonctl databases create --name ptat`
    -   update the database name in `bin/dev`'s `dev::db::prod` function (if you
        haven't already)

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

-   `./bin/dev setup`
-   run the following commands AND append to your shell configs (ie. `~/.zshrc`
    or `~/.bashrc`/`~/.bash_profile`)

```bash
eval "$(mise activate zsh)"
# or for bash
# eval "$(mise activate bash)"

source "$HOME/.cargo/env"
```

-   (optionally) configure mise: `~/.config/mise/settings.toml`

```toml
trusted_config_paths = ["~/Projects"] # where ~/Projects is wherever you clone your repos
```

-   `dev start`

### vscode (optional)

-   if you use vscode, we have some recommended extensions and settings
-   when you open the project in vscode, you should be prompted automatically to
    install the recommended extensions
-   settings can either be configured:

    -   globally, via the `Preferences: Open User Settings (JSON)` command
    -   just for this project, via the
        `Preferences: Open Workspace Settings (JSON)` command

    ```jsonc
    {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": "explicit",
        },
        "editor.acceptSuggestionOnCommitCharacter": false,
        "eslint.problems.shortenToSingleLine": true,
        "eslint.rules.customizations": [
            // set all eslint errors/warnings to show as warnings
            { "rule": "*", "severity": "warn" },
            // disable some rules in editor (they're just annoying while coding)
            { "rule": "import/no-unused-modules", "severity": "off" },
        ],
        "typescript.preferences.importModuleSpecifier": "non-relative",
        "javascript.preferences.importModuleSpecifier": "non-relative",
        "typescript.tsdk": "./node_modules/typescript/lib",
        "typescript.enablePromptUseWorkspaceTsdk": true,
    }
    ```

## Misc

### Diff decrypted env vales

-   add private key from <!-- TODO: replace name/link  -->
    [your password manager](https://start.1password.com/open) into
    `~/Library/Application Support/sops/age/keys.txt`

-   diff decrypted values

```bash
git -c 'diff.sops.textconv=sops -d' diff .env.preview.yml
# OR
git -c 'diff.sops.textconv=sops -d' show
```

### Disable pre-commit hooks (husky)

> We understand some find pre-commit hooks more annoying than useful, you're
> welcome to disable them as you see fit (checks will still run on pull requests
> & pushes to main)

-   for an individual commit: `git commit -m "..." -n`
-   permanently: `echo 'HUSKY=0' >> .env.local`

###### Bootstrapped with [pentible/typescript-app-template](https://github.com/pentible/typescript-app-template)

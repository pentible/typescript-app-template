# typescript-app-template

Template typescript application with a web, mobile, and desktop app.

Built with Next.js, Expo, Tauri, tRPC, Tailwind CSS, and Drizzle ORM.

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

    -   create env files for preview/production

        -   prepare your secrets per environment, ie. each should look something
            like this:

        ```yaml
        DATABASE_URL: mysql://root:password@localhost:3306/ptat
        # NOTE: you can append `_unencrypted` to keys which you don't want encrypted
        APP_URL_unencrypted: https://ptat.example.com
        ```

        -   write secrets to preview env: `dev env edit preview` (or in vscode:
            `EDITOR='code --wait' dev env ...`)

        -   write secrets to production env: `dev env edit prod`

        -   commit new secret files

-   setup github actions secrets (for deploy script)
    -   `PLANETSCALE_SERVICE_TOKEN`/`PLANETSCALE_SERVICE_TOKEN_ID`
        -   create a planetscale service token with the following permissions
            (Settings > Service tokens)
            -   Database access
                -   branch -> create_branch
                -   branch -> read_branch
                -   branch -> delete_branch
                -   branch -> connect_branch
                -   branch -> delete_branch_password
                -   deploy_request -> create_deploy_request
                -   deploy_request -> read_deploy_request
    -   `SOPS_AGE_KEY` (your sops private key, created above)
    -   `VERCEL_ORG_ID` (aka `Vercel ID` from https://vercel.com/account)
    -   `VERCEL_TOKEN` (create here https://vercel.com/account/tokens)
-   setup github actions vars (for deploy script)

    > NOTE: we setup these values as vars because they show up in urls/etc, so
    > it's pretty annoying if they get masked out

    -   `PLANETSCALE_ORG` (your planetscale org name from
        https://app.planetscale.com/)
    -   `VERCEL_SCOPE` (your vercel team, or personal account name)

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

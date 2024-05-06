---
title: Self made helper tools
id: doc-own-tools
---

## Our helper tools for local development and testing

We have a few useful tools in the `${PROJECT_ROOT}/_tools` folder some of them will be mentioned here, please see the content for more, or add your usefull ones if you wish.

Important: Most of the tools are not really prepared runnig outside of their original location and environment, most of them are assuming that will be started from the `${PROJECT_ROOT}` folder, all the examples bellow are assuming the same, so please take care when using them.
{: .notice--danger}

1. The most useful tool is `jekyll serve`, you can start it like `bundle exec jekyll serve`, but we have a script for it you can start like the original serve, e.g.

    ```shell
    ./_tools/serve --host=127.0.0.1 --port=4000 --livereload-port=30000 -l -w --trace
    ```

    This will,
    - live refresh the site pages which are opened in a browser page
    - handle '_config.yml' changes as well that is not supported by jekyll at the moment\

      Note: Unlike `--liverolad`, the latter will restart `jekyll serve` therefore will not refresh the opened web pages automatically, so you have to refresh the opend pages manually
      {: .notice}

    `serve` can handle 3 further functionalities that can be controlled via environment variables, like

    ```shell
    JEKYLL_USE_AUTO_PACK=yes JEKYLL_BUILD_TOOLTIPS=yes JEKYLL_BUILD_LINKS=yes ./_tools/serve --host=127.0.0.1 --port=4000 --livereload-port=30000 -l -w --trace
    ```

    a. `JEKYLL_BUILD_LINKS`, defaults to `'no'`, if set to `'yes'`, it updates the pages, and anchor links in the `${PROJECT_ROOT}/_data/links/` folder that will be used for autolink and tooltip generations

    Note: This can be triggered from `navgen` helper tool independently as well
    {: .notice}

    b. `JEKYLL_BUILD_TOOLTIPS`, defaults to `'no'`, if set to `'yes'`, it will generate the autolinks and tooltips into the final _site based on the content of `${PROJECT_ROOT}/_data/links/` folder

    Note: This could be a very long process, so if you are not working with the autolinks or tootltips, you can leave this option turned off (it will always run in the final CI site build process)
    {: .notice}

    c. `JEKYLL_USE_AUTO_PACK`, defaults to `'no'`, if set to `'yes'`, it automatically invokes the `pack` helper tool to [re-pack](#modify-and-repack-js) the `${PROJECT_ROOT}/assets/js/main.min.js` file if any changes detected in the `${PROJECT_ROOT}/_js/main.min.js` file, yes, for various reasons currently only that file is watched in the `${PROJECT_ROOT}/_js/` folder, so once you've finished your modification in it you can trigger the re-pack flow e.g. via

    ```shell
    touch ${PROJECT_ROOT}/_js/main.min.js
    ```

    Note: The distribution of the required files from `${PROJECT_ROOT}/_js/` to `${PROJECT_ROOT}/assets/js/` will always happen, this flag controls only the re-packing of the `main.min.js` (as on some systems it could lead to a broken packed file, or cannot run at all e.g. because the lack of node.js installation)
    {: .notice}

2. Generating the left sidebar navigator content, the page, and anchor links, is semi-automatic yet. The navigation bar content is generated from the `${PROJECT_ROOT}/_data/navigation.yml` file that will be read by jekyll automatically during the site build process, but adding the correct content of it is our responsibility. \
    Fortunately we already have a helper to simplify this, you can invoke it like

    ```shell
    ./_tools/navgen ./doc ./_data/navigation.yml
    ```

    This will update the `navigation.yml` file based on the content of the `${PROJECT_ROOT}/_doc` folder where all of our doumentation markdown files are located. \
    `navgen` accepts 2 further, anonymous 'boolean' options, both can be `'yes'` to turn it on, or anything else e.g. `'no'` to turn it off
    1. defaults to `'yes'`, sets value of `JEKYLL_BUILD_LINKS` env variable, if set to `'yes'`, it updates the pages, and anchor links in the `${PROJECT_ROOT}/_data/links/` folder.
    2. defaults to `'no'`,  sets value of `JEKYLL_BUILD_TOOLTIPS` env variable, if set to `'yes'`, it runs `jekyl build` to test building of the autolinks and tooltips, see `serve` for more.

    The `serve` tool can handle these as well automatically, see there.

    Important: This tools is part of the GitHub deployment workflow too, so any modification you add to `${PROJECT_ROOT}/_data/navigation.yml` file or `${PROJECT_ROOT}/_data/links` folder will be lost during the site build.
    {: .notice--danger}
3. <a name="modify-and-repack-js"></a>Sometimes its needed to [[update|mm-js-update]] the internally used `minimal-mistakes` theme default [[.js scripts|mm-javascripts]] \
    If you modify any of the scripts packed into the `${PROJECT_ROOT}/assets/js/main.min.js` file, you have to [[re-pack|mm-js-update]] it.
    You can use our, still a work in progress, but usable `pack` helper tool.
    After updated the given dependency .js file you can simply run

    ```shell
    ./_tools/pack
    ```

    It will update the `${PROJECT_ROOT}/assets/js/main.min.js` file that will be built and deployed normally in the next dev cycle. \
    `pack` can accept a single parameter that can be anything, if it recieves at least one parameter it will produce a beautified, human-readable `main.min.js` file.

    Important: This tools is also part of the GitHub deployment workflow, so any modification you add to `${PROJECT_ROOT}/assets/js/main.min.js` will be lost during the site build. \
    All the files in the `js` folder, except the ones in the `js/custom` folder, are presented here to get the re-packing work. \
    Packing all the requirements that really needed is not supported yet, please see the note bellow.
    So, only these default files will be packed at the moment, this is the inherited defult of `minimal-mistake`, if you have to modify these, please try to minimize the further dependencies otherwise the packing might not work anymore.
    {: .notice--danger}

    Note: There were multiple issues we could not deal with yet during re-packing and those are postponed for later examination. You can find some info about this in the script file, please feel free to contribute if you have a solution.
    {: .notice}

## Extensions, plug-ins

1. markdown_link

1. liquify

1. generate_links

1. generate_tooltips

1. \[\[title\|id\]\]

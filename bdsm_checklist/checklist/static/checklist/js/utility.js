//===============================================================================
// chainLoadAssets: Function to walk a list of assets to load, and
// load each in order
//
// format of assetList:
// array of hashes, each of which needs to contain 2 fields:
//  url: string containing url to load
// loadHandler: function to call when asset loaded. takes 2 parameters: (asset,listEntry)
//      asset is a reference to the loaded asset
//      listEntry is a reference to this entry in the asset list (so you can
//        embed additional parameters. See the name parameter in the below
//        templateLoaderFunction for an example of this)

function chainLoadAssets(assetList, callback)
{
    let assetToLoad = assetList.pop()
    if(assetToLoad)
    {
        $.get(assetToLoad['url'], function(asset)
        {
            assetToLoad['loadHandler'](asset,assetToLoad)
            chainLoadAssets(assetList,callback)
        });
    }
    else
    {
        // finished
        callback()
    }
}


//-------------------------------------------------------------------------------
// helper for loading and compiling handlebar templates with chainLoadAssets
// adds the requreiment of
//   name: name to store this asset in the Handlebars.templates hash under
// to the assetList entry


var templateLoaderFunction = function (asset,listEntry)
{
    // kts for now we are faking precompilation by loading and comiling here
    // once the django static precomiler has support for handlebars we will
    // switch to using that

    Handlebars.templates[listEntry['name']] = Handlebars.compile(asset)
}

var chainLoadSetStorageFunction = function (asset,listEntry)
{
    listEntry['storage'][listEntry['name']] = asset
}



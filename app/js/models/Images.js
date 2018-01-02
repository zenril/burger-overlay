class Images
{   
    
    constructor(index, obj) 
    {
        this.context = require.context("../../img/svgs", true, /^\.\/.*\.svg$/);
        var t = null;
    }

    ingredient(ingredient) {
        var uri = null;
        try {
            uri = this.context("./"+ingredient+".svg");
        } catch (e) {
            return null;
        }

        return uri;
            
    }
}

const singleton = new Images();
export default singleton;
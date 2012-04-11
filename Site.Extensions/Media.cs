using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Umbraco.Cms.Web.Model;

namespace Site.Extensions
{
    public static class Media
    {
        public static HtmlString Image(this Content content, string fieldAlias, int size)
        {   
            return new HtmlString("/media/etc/bleh")
        }        
    }
}

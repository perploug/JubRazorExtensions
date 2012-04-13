using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Umbraco.Cms.Web.Model;
using System.Web.Mvc;
using Umbraco.Cms.Web;
using Umbraco.Framework;

namespace Site.Extensions
{
    public static class Media
    {
        public static HtmlString Image(this Content content, string fieldAlias)
        {
            return new HtmlString(getMediaUrl(content, fieldAlias, 0));
        }

        public static HtmlString Image(this Content content, string fieldAlias, int size)
        {
            return new HtmlString(getMediaUrl(content, fieldAlias, size));
        }

        private static string getMediaUrl(Content content, string fieldAlias, int size){

            UrlHelper _urlHelper = new UrlHelper(((MvcHandler)HttpContext.Current.Handler).RequestContext);
            var url = _urlHelper.GetMediaUrl(content, fieldAlias, size);

            if (url == null || !url.StartsWith("/"))
            {
                var id = HiveId.TryParse(content.Field(fieldAlias).ToString());
                if (id.Success)
                {
                    url = _urlHelper.GetMediaUrl(id.Result, size);
                }
            }
            _urlHelper.DisposeIfDisposable();

            return url;
        }
    }
    
}

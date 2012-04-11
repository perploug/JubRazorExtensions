using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Umbraco.Cms.Web;
using Umbraco.Cms.Web.Model;
using System.Web;

namespace Site.Extensions
{
    public static class Selectors
    {
        public static Content Root(this Content currentPage)
        {
            var root = currentPage.AncestorContentOrSelf().Last();
            return (Content)root;
        }

        public static Content Random(this IQueryable<Content> collection)
        {
            System.Random r = new System.Random();
            var item = collection.ToArray()[r.Next(0, collection.Count())];
            return item;
        }

        public static IQueryable<Content> OfType(this IQueryable<Content> collection, string contentTypeAlias)
        {
            var newCollection = collection.Where<Content>("NodeTypeAlias == @0", contentTypeAlias);
            return newCollection;
        }

        public static IQueryable<Content> OfType(this Content content, string contentTypeAlias)
        {
            return content.Children().OfType(contentTypeAlias);
        }
    }
}

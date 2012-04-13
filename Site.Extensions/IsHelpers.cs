using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Umbraco.Cms.Web;
using Umbraco.Cms.Web.Model;
using System.Web;

namespace Site.Extensions
{
    public static class IsHelpers
    {
        public static HtmlString IsFirst(this Content content, string valueIfTrue, string valueIfFalse){
            if (content.ParentContent().Children().First().Id == content.Id)
                return new HtmlString(valueIfTrue);
            else
                return new HtmlString(valueIfFalse);
        }

        public static HtmlString IsNotFirst(this Content content, string valueIfTrue, string valueIfFalse)
        {
            return content.IsFirst(valueIfFalse, valueIfTrue);
        }

        public static HtmlString IsLast(this Content content, string valueIfTrue, string valueIfFalse)
        {
            var children = content.ParentContent().Children();
            var last = children.LastOrDefault();
            
            if (last.Id == content.Id)
                return new HtmlString(valueIfTrue);
            else
                return new HtmlString(valueIfFalse);
        }   

        public static HtmlString IsNotLast(this Content content, string valueIfTrue, string valueIfFalse)
        {
            return content.IsLast(valueIfFalse, valueIfTrue);
        }

        public static HtmlString IsPosition(this Content content, int position, string valueIfTrue, string valueIfFalse)
        {
            if (content.SortOrder == position)
                return new HtmlString(valueIfTrue);
            else
                return new HtmlString(valueIfFalse);
        }

        public static HtmlString IsNotPosition(this Content content, int position, string valueIfTrue, string valueIfFalse)
        {
            
            return content.IsPosition(position, valueIfFalse, valueIfTrue);
        }

        public static HtmlString IsAncestorOrSelf(this Content content, Content child, string valueIfTrue, string valueIfFalse)
        {
            if (child.AllAncestorIdsOrSelf().Contains(content.Id))
                return new HtmlString(valueIfTrue);
            else
                return new HtmlString(valueIfFalse);
        }

        public static HtmlString IsDescendantOrSelf(this Content content, Content ancestor, string valueIfTrue, string valueIfFalse)
        {
            if (ancestor.AllDescendantIdsOrSelf().Contains(content.Id))
                return new HtmlString(valueIfTrue);
            else
                return new HtmlString(valueIfFalse);
        }

        public static HtmlString IsAncestor(this Content content, Content child, string valueIfTrue, string valueIfFalse)
        {
            if (child.AllAncestorIds().Contains(content.Id))
                return new HtmlString(valueIfTrue);
            else
                return new HtmlString(valueIfFalse);
        }
        
        public static HtmlString IsDescendant(this Content content, Content ancestor, string valueIfTrue, string valueIfFalse)
        {
            if (ancestor.AllDescendantIds().Contains(content.Id))
                return new HtmlString(valueIfTrue);
            else
                return new HtmlString(valueIfFalse);
        }
        
        public static HtmlString IsEqual(this Content content, Content comparer, string valueIfTrue, string valueIfFalse)
        {
            if (comparer.Id == content.Id)
                return new HtmlString(valueIfTrue);
            else
                return new HtmlString(valueIfFalse);
        }



        public static bool IsVisible(this Content content)
        {
            if (content.Field("umbracoNaviHide") == null)
                return true;

            return content.Field("umbracoNaviHide").ToString() != "True";
        }

       
    }
}

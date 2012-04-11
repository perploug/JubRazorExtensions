namespace Site.Extensions
{
    public static class HtmlHelpers
    {
        public static string Truncate(string input, int length, string truncationCharacters = "...")
        {
            if (input.Length <= length)
                return input;

            return input.Substring(0, length) + truncationCharacters;
        }
    }
}
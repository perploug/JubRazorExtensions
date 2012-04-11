This package makes it really easy to run Umbraco V5 as a Visual Studio project.

If you’re anything like me, you love working in Visual Studio for all of you’re projects, but if you’re unsure, here’s a few reason why you want to download this package:
- Open the solution, hit F5 and you have a running website 
- The website runs in Debug mode by default, go set some breakpoints
- Edit your Razor files and Javascript files directly in the VS environment, with richer tooling than the default Umbraco editors
- Makes it easy to start developing custom code, just add a new project and start coding (example project included).


How to use
- Make a new folder, containing a folder named: Umbraco.Web
- In the Umbraco.Web folder, unzip the Umbraco build you're going to use.
- Then copy the files here into the root folder (1 directory up from Umbraco.Web)


For example: In my D:\Dev folder, I create a new folder called: MyCoolNewWebsite
In there, I create Umbraco.Web - The files from this zip go into D:\Dev\MyCoolNewWebsite\

Finally, open up Umbraco.Web.sln with Visual Studio and go develop!

By default, the project should start at http://localhost:5050 (using IISExpress) when you hit F5 in Visual Studio.

Requirements
- ASP.NET MVC3 installed (might need MVC2 installed as well)
- Visual Studio HAS to have SP1 installed
- You will need to install WebMatrix (easiest done with the Web Platform Installer). WebMatrix comes with IIS Express, which is what this project is configured to use as a webserver.


Tip: Visual Studio does not automatically include files that you create through the Umbraco interface. Sometimes you will need to hit the “Show All Files” (or: “Don’t lie to me”) button in the Solution Explorer to see and include the new files.
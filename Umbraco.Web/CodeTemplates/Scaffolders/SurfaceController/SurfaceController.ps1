[T4Scaffolding.Scaffolder(Description = "Enter a description of W00tNewAndNice here")][CmdletBinding()]
param(
	[parameter(Mandatory = $true, ValueFromPipelineByPropertyName = $true)][string]$ControllerName,        
    [string]$Project,
	[string]$CodeLanguage,
	[string[]]$TemplateFolders,
	[switch]$Force = $falseS
)

$outputPath = "Controllers\SurfaceControllers\"+$ControllerName+"SurfaceController"  # The filename extension will be added based on the template's <#@ Output Extension="..." #> directive
$namespace = (Get-Project $Project).Properties.Item("DefaultNamespace").Value

Add-ProjectItemViaTemplate $outputPath -Template SurfaceControllerTemplate `
	-Model @{ Namespace = $namespace; ControllerName = $ControllerName; ExampleValue = "Hello, world!" } `
	-SuccessMessage "Added SurfaceController output at {0}" `
	-TemplateFolders $TemplateFolders -Project $Project -CodeLanguage $CodeLanguage -Force:$Force

$modeloutputPath = "ViewModels\"+$ControllerName+"ViewModel"  # The filename extension will be added based on the template's <#@ Output Extension="..." #> directive
Add-ProjectItemViaTemplate $modeloutputPath -Template SurfaceControllerViewModelTemplate `
	-Model @{ Namespace = $namespace; ControllerName = $ControllerName; ExampleValue = "Hello, world!" } `
	-SuccessMessage "Added SurfaceController ViewModel output at {0}" `
	-TemplateFolders $TemplateFolders -Project $Project -CodeLanguage $CodeLanguage -Force:$Force
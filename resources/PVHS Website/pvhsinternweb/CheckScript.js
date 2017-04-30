/// <reference path="../../../../Scripts/Slick/slick.min.js" />
/// <reference path="../../../../Scripts/Slick/slick.min.js" />
/// <reference path="../../../../Scripts/Slick/slick.min.js" />
/// <reference path="../../../../Scripts/Slick/slick.min.js" />
// Check for included script
function CheckScript(ModuleName, ScriptSRC) {
    var FunctionName = '';
    
    switch (ModuleName.toLowerCase()) {
        case 'sectionrobot':
            FunctionName = 'CheckSectionRobotScript';
            ScriptSRC = homeURL + '/cms/Tools/SectionRobot/SectionRobot.js';
            break;
        case 'assignments':
            FunctionName = 'CheckAssignmentsScript';
            ScriptSRC = homeURL + '/cms/Module/Assignments/Assignments.js';
            break;
    	case 'spacedirectory':
    	    FunctionName = 'CheckSpaceDirectoryScript';
    		ScriptSRC = homeURL + '/cms/Module/SpaceDirectory/SpaceDirectory.js';
    		break;
        case 'calendar':
            FunctionName = 'CheckCalendarScript';
            ScriptSRC = homeURL + '/cms/Module/Calendar/Calendar.js';
            break;
        case 'fullcalendar':
            FunctionName = '$.fn.fullCalendar';
            ScriptSRC = staticURL + '/GlobalAssets/Scripts/ThirdParty/jquery.fullcalendar1.6.1.js';
            break;
        case 'links':
            FunctionName = 'CheckLinksScript';
            ScriptSRC = homeURL + '/cms/Module/Links/Links.js';
            break;
        case 'minibase':
            FunctionName = 'CheckMinibaseScript';
            ScriptSRC = homeURL + '/cms/Module/Minibase/Minibase.js';
            break;
        case 'moduleinstance':
            var randNum = Math.floor(Math.random() * (1000 - 10 + 1) + 1000);
            FunctionName = 'CheckModuleInstanceScript';
            ScriptSRC = homeURL + '/cms/Module/ModuleInstance/ModuleInstance.js?rand=' + randNum;
            break;
        case 'photogallery':
            FunctionName = 'CheckPhotoGalleryScript';
            ScriptSRC = homeURL + '/cms/Module/PhotoGallery/PhotoGallery.js';
            break;
        case 'comments':
            FunctionName = 'CheckModerateCommentsScript';
            ScriptSRC = homeURL + '/cms/Tools/ModerateComments/ModerateComments.js';
            break;
        case 'postings':
            FunctionName = 'CheckModeratePostingsScript';
            ScriptSRC = homeURL + '/cms/Tools/ModerateContribution/ModerateContribution.js';
            break;
        case 'myaccount':
            FunctionName = 'CheckMyAccountScript';
            ScriptSRC = homeURL + '/cms/UserControls/MyAccount/MyAccount.js';
            break;
        case 'formsurvey':
            FunctionName = 'CheckFormSurveyScript';
            ScriptSRC = homeURL + '/cms/tools/FormsAndSurveys/Surveys.js';
            break;
        case 'alerts':
            FunctionName = 'CheckAlertsScript';
            ScriptSRC = homeURL + '/cms/tools/Alerts/Alerts.js';
            break;

        case 'onscreenalerts':
            FunctionName = 'CheckOnScreenalertsScript';
            ScriptSRC = homeURL + '/cms/tools/OnScreenAlerts/OnScreenAlerts.js';
            break;

        case 'workspace':
            FunctionName = 'CheckWorkspaceScript';
            ScriptSRC = homeURL + '/cms/Workspace/PageList.js';
            break;
        case 'moduleview':
            FunctionName = 'CheckModuleViewScript';
            ScriptSRC = staticURL + '/GlobalAssets/Scripts/min/ModuleViewRenderer.js';
            break;
        case 'pageeditingmoduleview':
            FunctionName = 'CheckPageEditingModuleViewScript';
            //ScriptSRC = staticURL + '/GlobalAssets/Scripts/min/PageEditingModuleViewRenderer.js';
            ScriptSRC = homeURL + '/cms/UserControls/ModuleView/PageEditingModuleViewRenderer.js';
            break;
        case 'editarea':
            FunctionName = 'CheckEditAreaScript';
            ScriptSRC = homeURL + '/GlobalUserControls/EditArea/edit_area_full.js';
            break;
        case 'rating':
            FunctionName = '$.fn.rating';
            ScriptSRC = staticURL + '/GlobalAssets/Scripts/min/jquery.rating.min.js';
            break;
        case 'metadata':
            FunctionName = '$.fn.metadata';
            ScriptSRC = staticURL + '/GlobalAssets/Scripts/min/jquery.metadata.min.js';
            break;
        case 'pwcalendar':
            FunctionName = 'CheckPWCalendarScript';
            ScriptSRC = homeURL + '/myview/UserControls/Calendar/Calendar.js';
            break;
        case 'importwizard':
            FunctionName = 'CheckImportWizardScript';
            ScriptSRC = homeURL + '/cms/UserControls/ImportDialog/ImportWizard.js';
            break;
        case 'mustache':
            FunctionName = 'CheckMustacheScript';
            ScriptSRC = staticURL + '/GlobalAssets/Scripts/ThirdParty/mustache.js';
            break;
        case 'slick':
            FunctionName = 'CheckSlickScript';
            ScriptSRC = staticURL + '/GlobalAssets/Scripts/ThirdParty/Slick/slick.min.js';
            break;
        case 'galleria':
            FunctionName = 'CheckGalleriaScript';
            ScriptSRC = staticURL + '/GlobalAssets/Scripts/ThirdParty/galleria/galleria-1.2.9.js';
            break;

        case 'fine-uploader':
            FunctionName = 'CheckFineUploaderScript';
            ScriptSRC = staticURL + '/GlobalAssets/Scripts/ThirdParty/fine-uploader/fine-uploader.min.js';
            break;

        default:
            FunctionName = 'Check' + ModuleName + 'Script';
            //ScriptSRC = ScriptSRC;
            break;
    }

    if (eval("typeof " + FunctionName + " == 'function'")) {
        // do nothing, it's already included
    } else {
	        
        $.ajax({
            url: ScriptSRC,
            async: false,
            cache: true,
            success: function(msg){
                var result = msg.d;
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.text = result;
                $('head').append(script);
            }
        });
    }
}
// End Check for included script
    
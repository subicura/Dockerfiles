<?php

$wgShowExceptionDetails="true";
$wgEnableUploads=true;
$wgLogo="$wgResourceBasePath/resources/assets/mediawiki.png";

# Disable reading by anonymous users
$wgGroupPermissions['*']['read'] = false;
# But allow them to read e.g., these pages:
$wgWhitelistRead =  array ( "Main Page", "MediaWiki:Common.css", "MediaWiki:Common.js" );


/***** SemanticMediaWiki and related */
/*
require_once "$IP/extensions/ParamProcessor/DefaultConfig.php";
require_once "$IP/extensions/Validator/Validator.php";
require_once "$IP/extensions/SemanticMediaWiki/SemanticMediaWiki.php";
require_once "$IP/extensions/SemanticForms/SemanticForms.php";
require_once "$IP/extensions/SemanticResultFormats/SemanticResultFormats.php";
*/
/***** VisualEditor */
/*
require_once "$IP/extensions/VisualEditor/VisualEditor.php";
$wgDefaultUserOptions['visualeditor-enable'] = 1; // Enable by default for everybody
$wgHiddenPrefs[] = 'visualeditor-enable'; // Don't allow users to disable it
$wgVisualEditorParsoidURL = "http://{$_ENV['PARSOID_PORT_8000_TCP_ADDR']}:{$_ENV['PARSOID_PORT_8000_TCP_PORT']}";
*/

/***** Slack */
// @see https://github.com/grundleborg/mediawiki-slack
/*
require_once "$IP/extensions/Slack/Slack.php";
$wgSlackWebhookURL = "https://hooks.slack.com/services/....replace.me";
$wgSlackUserName = "wiki";
$wgSlackChannel = "#general";
*/


/***** LDAP */
// @see https://www.mediawiki.org/wiki/Extension:LDAP_Authentication
require_once "$IP/extensions/LdapAuthentication/LdapAuthentication.php";
require_once "$IP/includes/AuthPlugin.php";

$wgAuth = new LdapAuthenticationPlugin();
$wgLDAPDomainNames = array(
  'openldap',
);
$wgLDAPServerNames = array(
  'openldap' => 'openldap',
);
$wgLDAPUseLocal = false;
$wgLDAPEncryptionType = array(
  'openldap' => 'clear',
);
$wgLDAPPort = array(
  'openldap' => 389,
);
$wgLDAPProxyAgent = array(
  'openldap' => 'cn=admin,dc=dl,dc=net',
);
$wgLDAPProxyAgentPassword = array(
  'openldap' => 'Pa$$w0rd',
);
$wgLDAPSearchAttributes = array(
  'openldap' => 'uid'
);
$wgLDAPBaseDNs = array(
  'openldap' => 'dc=dl,dc=net',
);
# To pull e-mail address from LDAP
$wgLDAPPreferences = array(
  'openldap' => array( 'email' => 'mail')
);
# Group based restriction
$wgLDAPGroupUseFullDN = array( "openldap"=>false );
$wgLDAPGroupObjectclass = array( "openldap"=>"posixgroup" );
$wgLDAPGroupAttribute = array( "openldap"=>"memberuid" );
$wgLDAPGroupSearchNestedGroups = array( "openldap"=>false );
$wgLDAPGroupNameAttribute = array( "openldap"=>"cn" );
//$wgLDAPRequiredGroups = array( "openldap"=>array("cn=ldapwiki,ou=groups,ou=DL_ADC,dc=dl,dc=net"));
$wgLDAPLowerCaseUsername = array(
  'openldap' => true,
);
$wgLDAPUseLDAPGroups = array( "openldap"=>true );

/**** MobileFrontend */
require_once("$IP/extensions/MobileFrontend/MobileFrontend.php");
$wgMFAutodetectMobileView = true;

include('/data/secure.php');
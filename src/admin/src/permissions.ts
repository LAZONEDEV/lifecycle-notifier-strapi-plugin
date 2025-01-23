const pluginId = "lifecycle-notifier";

const settingsRead = {
  action: `plugin::${pluginId}.settings.read`,
  subject: null,
};
const settingsUpdate = {
  action: `plugin::${pluginId}.settings.update`,
  subject: null,
};
const mainRead = { action: `plugin::${pluginId}.read`, subject: null };
const mainCreate = { action: `plugin::${pluginId}.create`, subject: null };
const mainUpdate = { action: `plugin::${pluginId}.update`, subject: null };
const mainDelete = { action: `plugin::${pluginId}.delete`, subject: null };
const menuLink = { action: `plugin::${pluginId}.menu-link`, subject: null };

const pluginPermissions = {
  // Permissions pour l'accès au plugin dans le menu et l'interface d'administration
  settingsRoles: [].concat(settingsRead, settingsUpdate, menuLink),
  settingsRead,
  settingsUpdate,
  mainRead,
  mainCreate,
  mainUpdate,
  mainDelete,
};

export default pluginPermissions;

import * as core from '@actions/core'
import * as toolCache from '@actions/tool-cache';
import * as exec from '@actions/exec';
import * as os from "os";

const NSIS_INSTALL_DIR = 'C:\\Program Files (x86)\\NSIS';

function resolveInstallerDownloadUrl(nsisVersion: string) {
    return `http://downloads.sourceforge.net/project/nsis/NSIS%203/${nsisVersion}/nsis-${nsisVersion}-setup.exe`;
}

async function installNsis() {
    const nsisVersion = core.getInput('nsis-version', {required: true});

    const installerDownloadUrl = resolveInstallerDownloadUrl(nsisVersion)
    const installer = await toolCache.downloadTool(installerDownloadUrl);
    await exec.exec(`${installer} \\S`)
}

function resolveEnvVarPluginDownloadUrl() {
    return 'https://nsis.sourceforge.io/mediawiki/images/7/7f/EnVar_plugin.zip'
}

async function installEnvVarPlugin() {
    const envVarPluginDownloadUrl = resolveEnvVarPluginDownloadUrl()
    const envVarPluginArchive = await toolCache.downloadTool(envVarPluginDownloadUrl);
    await toolCache.extractZip(envVarPluginArchive, NSIS_INSTALL_DIR)
}

function getErrorMessage(error: any): string {
    if (error instanceof Error) {
        return error.message
    } else {
        return error
    }
}

async function run(): Promise<void> {
    if (os.platform() !== 'win32') {
        core.setFailed(`unsupported OS ${os.platform()}`)
        return
    }

    try {
        await installNsis()
        await installEnvVarPlugin()
    } catch (error) {
        core.setFailed(getErrorMessage(error))
    }
}

run()

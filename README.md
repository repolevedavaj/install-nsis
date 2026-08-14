# Install NSIS

Installs NSIS on a Windows runner, including the long string build and the EnVar plugin.

The action performs three steps:

1. Installs the requested NSIS version.
2. Applies the official `strlen_8192` long string patch, so scripts can handle strings
   up to 8192 bytes. This matters most when editing `PATH`, which often exceeds the
   default limit of 1024 bytes.
3. Installs the [EnVar plugin](https://github.com/GsNSIS/EnVar) for reading and writing
   environment variables.

Every downloaded file is verified before it is used. The NSIS files are checked against
the size and MD5 that SourceForge publishes for the release, and the EnVar plugin is
pinned to an upstream release and checked against its SHA-256.

## Inputs

### `nsis-version`

Required. The version of NSIS to install, for example `'3.12'`.

Quote the value. Without quotes, YAML reads `3.10` as the number `3.1` and the install
fails.

## Example usage

```yaml
uses: repolevedavaj/install-nsis@v1
with:
  nsis-version: '3.12'
```

## Versioning

The `v1` tag always points at the latest `v1.x.y` release, and `v1.2` at the latest
`v1.2.x` release. Use one of these to receive fixes without editing your workflow.

Pin the full version, for example `@v1.2.1`, or a commit SHA if you need the action to
stay exactly as it is today.

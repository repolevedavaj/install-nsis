# Install NSIS

Installs NSIS on a Windows runner, including the long string build and the EnVar plugin.

1. Installs the requested NSIS version.
2. Applies the official `strlen_8192` patch, so scripts can handle strings up to 8192
   bytes instead of 1024. This matters most when editing `PATH`.
3. Installs the [EnVar plugin](https://github.com/GsNSIS/EnVar) for reading and writing
   environment variables.

Nothing is installed before it is verified. The NSIS files are checked against the size
and MD5 that SourceForge publishes, the EnVar plugin against a pinned SHA-256.

## Inputs

### `nsis-version`

Required. The version of NSIS to install, for example `'3.12'`.

Quote the value. Without quotes, YAML reads `3.10` as the number `3.1`.

## Example usage

```yaml
uses: repolevedavaj/install-nsis@v1
with:
  nsis-version: '3.12'
```

## Versioning

`v1` points at the latest `v1.x.y` release, and each release also updates the tag for its
own minor line, so `v1.3` points at the latest `v1.3.x`. Use one of these to get fixes
without editing your workflow. Pin a full version such as `@v1.3.0`, or a commit SHA, to
stay on exactly what you have today.

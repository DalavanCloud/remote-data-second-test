# jupyterlab-remote-data

A JupyterLab extension for rendering my_mimetype files.

## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install jupyterlab-remote-data
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

## installation

Python side:

```
pip install -e .
```

set the following in your notebook config file

```
c.NotebookApp.contents_manager_class='remotecontentmanager.RemoteLocalFileManager'
```

Or directly from the command line:

```
jupyter lab --NotebookApp.contents_manager_class=remotecontentmanager.RemoteLocalFileManager
```

This will treat any file which [Add heuristic there] as a large/remote file, and
send the representation as [TODO, decide of mimetype and info about this
mimetype]


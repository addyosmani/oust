oust
====

> Extract lists of stylesheets, scripts or HTML imports from files

### Install

```
npm install oust --save-dev
```

### Usage

## Extract stylesheets references `<link rel="stylesheet">`

```
oust({ src: 'test/sample/index.html' } , function ( links ){
	console.log(links);
});
```

## Extract script references `<script src>`

```
oust({ 
	src: 'test/sample/index.html', 
	selector: 'script', 
	attribute: 'src'
	}, function (links){
		console.log(links);
	});
```

## Extract HTML imports `<link rel="import">`

```
oust({ 
	src: 'test/imports.html', 
	selector: 'link[rel="import"]', 
	attribute: 'href' 
	}, function (links){
		console.log(links);
	});
```

Released under an Apache 2 license.
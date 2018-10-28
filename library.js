
'use strict';

const composerFormatting = (data, callback) => {
	data.options.push({
		name: 'spoiler',
		className: 'fa fa-eye',
		title: 'Spoiler',
	});
	callback(null, data);
};
module.exports.composerFormatting = composerFormatting;

const replaceSpoilerContent = (content) => {
	var newContent = content;
	const startSpoiler = new RegExp (/(?:(?<!<code>)|(?<=<\/code>))\[s(?:=([^\]]*)|)\]/g);
	const endSpoiler = new RegExp (/(?:(?<!<code>)|(?<=<\/code>))\[\/s\](<\/li>\n<\/(?:ol|ul)>|)/g);
	newContent = newContent.replace(startSpoiler, (match, p1) => `<section class="spoiler-wrapper"><button class="spoiler-control btn btn-default">${p1 ? p1 : 'Spoiler'}</button><section style="display: none;" class="spoiler-content">`);
	newContent = newContent.replace(endSpoiler, (match, p1) => `${p1}</section></section>`);
	return newContent;
}

const parsePost = (data, callback) => {
	var newContent = replaceSpoilerContent(data.postData.content);
	const newData = { ...data };
	newData.postData.content = newContent;
	callback(null, newData);
};
module.exports.parsePost = parsePost;

const parseRaw = (data, callback) => {
	var newContent = replaceSpoilerContent(data);
	callback(null, newContent);
};
module.exports.parseRaw = parseRaw;

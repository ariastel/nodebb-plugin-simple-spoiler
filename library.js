
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
	newContent = newContent.replace(/\[s(?:=([^\]]*)|)\]/gm, (match, p1) => `<div class="spoiler-wrapper"><button class="spoiler-control">${p1 ? p1 : 'Spoiler'}</button><div style="display: none;" class="spoiler-content">`);
	newContent = newContent.replace(/\[\/(?:s)\]/gm, '</div></div>');
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

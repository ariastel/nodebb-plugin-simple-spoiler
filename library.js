
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

const parsePost = (data, callback) => {
	var newContent = data.postData.content;
	newContent = newContent.replace(/\[s\]/gm, '<div class="spoiler-wrapper"><button class="spoiler-control">Spoiler</button><div style="display: none;" class="spoiler-content">');
	newContent = newContent.replace(/\[\/(?:s)\]/gm, '</div></div>');
	const newData = { ...data };
	newData.postData.content = newContent;
	callback(null, newData);
};
module.exports.parsePost = parsePost;

const parseRaw = (data, callback) => {
	var newContent = data;
	newContent = newContent.replace(/\[s\]/gm, '<div class="spoiler-wrapper"><button class="spoiler-control">Spoiler</button><div style="display: none;" class="spoiler-content">');
	newContent = newContent.replace(/\[\/(?:s)\]/gm, '</div></div>');
	callback(null, newContent);
};
module.exports.parseRaw = parseRaw;

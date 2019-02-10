
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
	console.log(newContent);
	if (newContent.includes('<code')) {
		const separatedByCodeBlocks = newContent.replace(/<code/gi, "splitme<code").replace(/<\/code>/gi, "<\/code>splitme").split("splitme");
		const formattedBlocks = separatedByCodeBlocks.map(text => text.includes('<code') ? text : formatSpoiler(text));
		newContent = formattedBlocks.join('');
	}
	else{
		newContent = formatSpoiler(newContent);
	}
	console.log(newContent);
	return newContent;
}

const formatSpoiler = (text) => {
	const startSpoiler = new RegExp(/\[s(?:=([^\]]*)|)\]/g);
	const endSpoiler = new RegExp(/\[\/s\](<\/li>\n<\/(?:ol|ul)>|)/g);
	return text.replace(startSpoiler, (match, p1) => `<section class="spoiler-wrapper"><button class="spoiler-control btn btn-default">${p1 ? p1 : 'Spoiler'}</button><section style="display: none;" class="spoiler-content">`).replace(endSpoiler, (match, p1) => `${p1}</section></section>`);
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

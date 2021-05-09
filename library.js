'use strict';

const SpoilerPlugin = {};

function formatSpoiler(text) {
	const startSpoiler = new RegExp(/\[s(?:=([^\]]*)|)\]/g);
	const endSpoiler = new RegExp(/\[\/s\](<\/li>\n<\/(?:ol|ul)>|)/g);
	return text.replace(
		startSpoiler, 
		(match, p1) => `<section class="spoiler-wrapper"><button class="spoiler-control btn btn-default">${p1 ? p1 : 'Spoiler'}</button><section style="display: none;" class="spoiler-content">`)
			.replace(endSpoiler, (match, p1) => `${p1}</section></section>`
	);
}
function replaceSpoilerContent(content) {
	let newContent = content;
	if (newContent.includes('<code')) {
		const separatedByCodeBlocks = newContent.replace(/<code/gi, "splitme<code").replace(/<\/code>/gi, "<\/code>splitme").split("splitme");
		const formattedBlocks = separatedByCodeBlocks.map(text => text.includes('<code') ? text : formatSpoiler(text));
		newContent = formattedBlocks.join('');
	} else {
		newContent = formatSpoiler(newContent);
	}
	return newContent;
}

SpoilerPlugin.composerFormatting = async function composerFormatting(data) {
	data.options.push({
		name: 'spoiler',
		className: 'fa fa-eye',
		title: '[[aa_simple-spoiler:spoiler]]',
	});
	return data;
};

SpoilerPlugin.parsePost = async function parsePost(data) {
	const newData = { ...data };
	newData.postData.content = replaceSpoilerContent(data.postData.content);
	return newData;
};

SpoilerPlugin.parseRaw = async function parseRaw(data) {
	return replaceSpoilerContent(data);
};

module.exports = SpoilerPlugin;
import {Modal} from 'react-bootstrap';
import React from 'react';
import {SingleEntityModalProps} from '../interface/type';
import _ from 'lodash';
import {dateObjectToISOString} from '../../helpers/utils';


/* eslint-disable sort-keys */
const BASE_ENTITY = {
	Name: 'nameSection.name',
	Language: 'nameSection.language',
	'Sort-Name': 'nameSection.sortName',
	Disambiguation: 'nameSection.disambiguation',
	Annotation: 'annotationSection.content',
	'Edit-Note': 'submissionSection.note'

};
const ENTITY_FIELDS = {
	edition: {
		...BASE_ENTITY,
		format: 'editionSection.format',
		'Release-date': 'editionSection.releaseDate',
		status: 'editionSection.status',
		'Edition-languages': 'editionSection.languages',
		pages: 'editionSection.pages',
		width: 'editionSection.width',
		height: 'editionSection.height',
		weight: 'editionSection.weight',
		depth: 'editionSection.depth'
	},
	editionGroup: {
		...BASE_ENTITY,
		Type: 'editionGroupSection.type'
	},
	author: {
		...BASE_ENTITY,
		Gender: 'authorSection.gender',
		Type: 'authorSection.type',
		'Begin-date': 'authorSection.beginDate',
		'Begin-area': 'authorSection.beginArea.text',
		'Dead?': 'authorSection.ended',
		'End-date': 'authorSection.endDate',
		'End-area': 'authorSection.endArea.text'
	},
	publisher: {
		...BASE_ENTITY,
		Type: 'publisherSection.type',
		'Begin-date': 'publisherSection.beginDate',
		'Dissolved?': 'publisherSection.ended',
		'End-date': 'publisherSection.endDate'

	},
	series: {
		...BASE_ENTITY,
		orderType: 'seriesSection.orderType',
		seriesType: 'seriesSection.seriesType'
	},
	work: {
		...BASE_ENTITY,
		type: 'workSection.type',
		'Work-languages': 'workSection.languages'
	}
};
export default function SingleEntityModal({entity, show, handleClose, languageOptions}:SingleEntityModalProps) {
	const id2LanguageMap = React.useMemo(() => Object.fromEntries(_.map(languageOptions, (option) => [option.id, option.name])), []);
	function renderField(path, key) {
		let fieldVal = _.get(entity, path, '');
		if (!fieldVal || (fieldVal.length === 0)) {
			return;
		}
		if (key === 'Language') {
			fieldVal = id2LanguageMap[fieldVal];
		}
		if (key.includes('languages')) {
			fieldVal = _.reduce(fieldVal, (acc, next) => `${acc}${acc.length !== 0 ? ',' : ''} ${next.label}`, '');
		}
		if (key.includes('date')) {
			if (typeof fieldVal !== 'string') {
				if (!fieldVal.day && !fieldVal.month && !fieldVal.year) {
					return;
				}
				fieldVal = dateObjectToISOString(fieldVal);
			}
		}
		// eslint-disable-next-line consistent-return
		return <span className="d-block"><b>{key}</b>: {typeof fieldVal === 'string' ? fieldVal : JSON.stringify(fieldVal)}</span>;
	}
	const entityFields = ENTITY_FIELDS[_.camelCase(entity.type)] ?? {};
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{entity.type}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{_.map(entityFields, renderField)}
			</Modal.Body>

		</Modal>
	);
}
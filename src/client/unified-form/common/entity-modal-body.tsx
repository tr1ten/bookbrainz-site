// import * as Bootstrap from 'react-bootstrap';
import {Accordion, Card} from 'react-bootstrap';
import AliasEditor from '../../entity-editor/alias-editor/alias-editor';
import AnnotationSection from '../../entity-editor/annotation-section/annotation-section';
import ButtonBar from '../../entity-editor/button-bar/button-bar';
import IdentifierEditor from '../../entity-editor/identifier-editor/identifier-editor';
import NameSection from '../../entity-editor/name-section/name-section';
import React from 'react';
import RelationshipSection from '../../entity-editor/relationship-editor/relationship-section';
import SubmissionSection from '../../entity-editor/submission-section/submission-section';
import {connect} from 'react-redux';


type EntityModalBodyStateProps = {
	aliasEditorVisible:boolean,
	identifierEditorVisible:boolean
};

type EntityModalBodyOwnProps = {
    onModalSubmit:(e)=>unknown,
    entityType:string,
	validate:(arg)=>unknown
	children?: React.ReactElement
};
type EntityModalBodyProps = EntityModalBodyOwnProps & EntityModalBodyStateProps;

function EntityModalBody({onModalSubmit, aliasEditorVisible, identifierEditorVisible, children, validate, ...rest}:EntityModalBodyProps) {
	return (
		<form onSubmit={onModalSubmit}>
			<AliasEditor show={aliasEditorVisible} {...rest}/>
			<Accordion >
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="0">Basic
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							<NameSection {...rest} isUf={false}/>
							<ButtonBar {...rest} isUf={false}/>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
			<Accordion >
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="0">Entity Section
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							{
								React.cloneElement(
									React.Children.only(children),
									{...rest}
								)
							}
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
			<Accordion >
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="0">Relationships
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							<RelationshipSection {...rest}/>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
			<IdentifierEditor show={identifierEditorVisible} {...rest}/>
			<Accordion >
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="0">Annotation
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							<AnnotationSection {...rest}/>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
			<SubmissionSection {...rest} validate={validate} onSubmit={onModalSubmit}/>

		</form>
	);
}
EntityModalBody.defaultProps = {
	children: null
};
function mapStateToProps(rootState): EntityModalBodyStateProps {
	const state = rootState.get('buttonBar');
	return {
		aliasEditorVisible: state.get('aliasEditorVisible'),
		identifierEditorVisible: state.get('identifierEditorVisible')
	};
}

export default connect<EntityModalBodyStateProps, null>(mapStateToProps, null)(EntityModalBody);
import BpmnDiagram from "./bpmnXmlCode";
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from "react";
const { Button } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
  },
})

let somess = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:modeler="http://camunda.org/schema/modeler/1.0" xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_0o87biy" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Web Modeler" exporterVersion="e414032" modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="8.4.0" camunda:diagramRelationId="fb106f6d-8291-4045-83fc-3ca3615685f3">
  <bpmn:collaboration id="AbsenceRequestProcessPool">
    <bpmn:participant id="Participant_056nh3b" name="Absence Request Process" processRef="absence-request-process-10w7pa5-0g8ll82" />
  </bpmn:collaboration>
  <bpmn:process id="absence-request-process-10w7pa5-0g8ll82" name="Absence Request Process" isExecutable="true">
    <bpmn:extensionElements>
      <zeebe:userTaskForm id="userTaskForm_0oc50o5">{ "components": [ { "label": "Image view", "type": "image", "layout": { "row": "Row_0c621v1", "columns": null }, "id": "Field_10pqfzl", "source": "https://camunda.com/wp-content/uploads/2020/05/logo-camunda-black.svg", "alt": "Company Logo Camunda" }, { "text": "# Request absence", "type": "text", "id": "Field_0dg5q7w", "layout": { "row": "Row_0wbhdaq" } }, { "label": "Employee", "type": "textfield", "id": "Field_1m8nbdw", "key": "employeeName", "description": "Enter your name (first and last name)", "disabled": false, "validate": { "required": true }, "layout": { "row": "Row_0y18pze" } }, { "values": [ { "label": "Sales", "value": "sales" }, { "label": "Marketing", "value": "marketing" }, { "label": "Finance", "value": "finance" }, { "label": "IT", "value": "it" } ], "label": "Department", "type": "select", "id": "Field_1dqcnae", "key": "department", "searchable": false, "description": "Select your department", "defaultValue": "&lt;none&gt;", "validate": { "required": true }, "layout": { "columns": null, "row": "Row_1n89yw7" } }, { "values": [ { "label": "Flexible time off", "value": "flexibleTimeOff" }, { "label": "Sickness", "value": "sickness" }, { "label": "Parental Leave", "value": "parentalLeave" }, { "label": "Public Holiday", "value": "publicHoliday" }, { "label": "Business Travel", "value": "businessTravel" } ], "label": "Policy", "type": "select", "id": "Field_0xwaxu5", "key": "policy", "description": "Select the policy your request is based on", "validate": { "required": true }, "layout": { "columns": null, "row": "Row_01r6csf" } }, { "subtype": "date", "dateLabel": "Absence start date", "label": "Date time", "type": "datetime", "id": "Field_1lxogpf", "key": "absenceStartDate", "description": "Select the date your absence should start on", "validate": { "required": true }, "layout": { "columns": 8, "row": "Row_0vhsv3n" } }, { "subtype": "date", "dateLabel": "Absence End date (including)", "label": "Date time", "type": "datetime", "id": "Field_091k24u", "key": "absenceEndDate", "description": "Select the date your absence should end on", "validate": { "required": true }, "layout": { "columns": null, "row": "Row_0vhsv3n" } }, { "label": "Comment", "type": "textfield", "id": "Field_0oxn799", "key": "requestComment", "description": "Add some additional comments to your request (not required)", "layout": { "row": "Row_1t2anya" } } ], "schemaVersion": 8, "exporter": { "name": "Camunda Web Modeler", "version": "faf7aad" }, "type": "default", "id": "Form_05b6cf95-4c81-452b-bebb-9d4f516e8465", "executionPlatform": "Camunda Cloud", "executionPlatformVersion": "8.2.0" }</zeebe:userTaskForm>
      <zeebe:userTaskForm id="userTaskForm_080698f">{ "components": [ { "text": "## Your absence request has not been approved yet and needs further clarification.", "type": "text", "id": "Field_15mb7b4", "layout": { "row": "Row_1wk4xc8" } }, { "text": "Your line manager {{assignedLineManager}} stated the following clarification comment:\n\n{{clarificationCommentLineManager}}", "type": "text", "id": "Field_1yjc9hs", "layout": { "row": "Row_1ybds63" } }, { "text": "Please adjust your request as stated in the comment:", "type": "text", "id": "Field_0d02fse", "layout": { "row": "Row_05x1gxw" } }, { "subtype": "date", "dateLabel": "Absence start date", "label": "Date time", "type": "datetime", "id": "Field_1k7qvcw", "key": "absenceStartDate", "layout": { "row": "Row_05eyc1h" } }, { "subtype": "date", "dateLabel": "Absence end date (including)", "label": "Date time", "type": "datetime", "id": "Field_06gaeho", "key": "absenceEndDate", "layout": { "row": "Row_05eyc1h" } }, { "label": "Comment to further clarify", "type": "textfield", "id": "Field_1wfun62", "key": "clarificationCommentEmployee", "layout": { "row": "Row_1skrtj8" }, "validate": { "required": true } } ], "schemaVersion": 8, "exporter": { "name": "Camunda Web Modeler", "version": "a48d353" }, "type": "default", "id": "Form_21505344-3f9e-443c-b488-4cc88422ec3e", "executionPlatform": "Camunda Cloud", "executionPlatformVersion": "8.1.0" }</zeebe:userTaskForm>
      <zeebe:userTaskForm id="userTaskForm_2e543cn">{ "components": [ { "text": "=\"This is a reminder that the absence request from your employee \" + employeeName + \" is still pending and needs to be approved, clarified or rejected.\"", "type": "text", "id": "Field_0zkgcz1" }, { "text": "You don't need to to anything here but completing the task.", "type": "text", "id": "Field_1d5icpq" } ], "schemaVersion": 7, "exporter": { "name": "Camunda Web Modeler", "version": "b37faf9" }, "type": "default", "id": "Form_145b7eab-a1fa-46b9-899d-8b51c3eb26d2", "executionPlatform": "Camunda Cloud", "executionPlatformVersion": "8.2.0" }</zeebe:userTaskForm>
      <zeebe:userTaskForm id="userTaskForm_2nbloc6">{ "components": [ { "text": "Please make sure to log the absence in the HR system.", "type": "text", "id": "Field_0yh2bru" }, { "label": "I logged the absence in the HR system", "type": "checkbox", "id": "Field_0aa5ggk", "key": "absenceLogged" } ], "schemaVersion": 7, "exporter": { "name": "Camunda Web Modeler", "version": "b37faf9" }, "type": "default", "id": "Form_39c4a16f-4acd-4181-bd4f-abab9b13f7aa", "executionPlatform": "Camunda Cloud", "executionPlatformVersion": "8.1.0" }</zeebe:userTaskForm>
      <zeebe:userTaskForm id="userTaskForm_0m5l2n6">{ "components": [ { "text": "=\"This is a notification that your absence request has been \" + approvalResult + \" by your line manager \" + assignedLineManager + \" .\"", "type": "text", "id": "Field_1imlq2e" }, { "text": "You don't need to to anything here but completing the task.", "type": "text", "id": "Field_16eto3g" } ], "schemaVersion": 7, "exporter": { "name": "Camunda Web Modeler", "version": "b37faf9" }, "type": "default", "id": "Form_05218fe1-7e95-4430-8387-d74c6dc7b58b", "executionPlatform": "Camunda Cloud", "executionPlatformVersion": "8.1.0" }</zeebe:userTaskForm>
      <zeebe:userTaskForm id="userTaskForm_09t4jnc">{ "components": [ { "text": "Please make sure to log the absence in the HR system.", "type": "text", "id": "Field_0yh2bru", "layout": { "row": "Row_1pl3i0i" } }, { "label": "I logged the absence in the HR system", "type": "checkbox", "id": "Field_0aa5ggk", "key": "absenceLogged", "layout": { "row": "Row_1eadsmf" } } ], "schemaVersion": 8, "exporter": { "name": "Camunda Web Modeler", "version": "1961f08" }, "type": "default", "id": "Form_39c4a16f-4acd-4181-bd4f-abab9b13f7aa", "executionPlatform": "Camunda Cloud", "executionPlatformVersion": "8.1.0" }</zeebe:userTaskForm>
      <zeebe:userTaskForm id="userTaskForm_0dl4rab">{ "components": [ { "text": "This is a reminder that the absence request from your employee {{employeeName}} is still pending and needs to be approved, clarified or rejected.\nYou don't need to do anything here but completing the task.", "type": "text", "id": "Field_0zkgcz1", "layout": { "row": "Row_0ki9pho" } } ], "schemaVersion": 8, "exporter": { "name": "Camunda Web Modeler", "version": "a48d353" }, "type": "default", "id": "Form_145b7eab-a1fa-46b9-899d-8b51c3eb26d2", "executionPlatform": "Camunda Cloud", "executionPlatformVersion": "8.2.0" }</zeebe:userTaskForm>
      <zeebe:userTaskForm id="userTaskForm_0fptdc8">{   "components": [     {       "text": "# Approve request",       "type": "text",       "id": "Field_1pfgqr5",       "layout": {         "row": "Row_1lsvlzl"       }     },     {       "label": "Employee",       "type": "textfield",       "id": "Field_0109m34",       "key": "employeeName",       "description": "The employee that requested an absence",       "disabled": true,       "layout": {         "row": "Row_1izxcd3"       }     },     {       "subtype": "date",       "dateLabel": "Absence start date",       "label": "Date time",       "type": "datetime",       "id": "Field_15dkvnr",       "key": "absenceStartDate",       "description": "The requested absence start date by the employee",       "disabled": true,       "layout": {         "columns": 8,         "row": "Row_0zovpme"       }     },     {       "subtype": "date",       "dateLabel": "Absence end date",       "label": "Date time",       "type": "datetime",       "id": "Field_1wbuhgo",       "key": "absenceEndDate",       "description": "The requested absence end date (including) by the employee",       "disabled": true,       "layout": {         "columns": 8,         "row": "Row_0zovpme"       }     },     {       "label": "Employee Comment",       "type": "textfield",       "id": "Field_02emki1",       "key": "requestComment",       "description": "An additional comment that was stated by the employee",       "conditional": {         "hide": "=requestComment = \"\""       },       "appearance": {},       "disabled": true,       "layout": {         "row": "Row_0yx3xn5"       }     },     {       "label": "Clarification Comment by Employee",       "type": "textfield",       "id": "Field_0vqocbd",       "key": "clarificationCommentEmployee",       "disabled": true,       "conditional": {         "hide": "=clarificationCommentEmployee = \"\""       },       "layout": {         "row": "Row_0n3lewp"       }     },     {       "values": [         {           "label": "is approved",           "value": "approved"         },         {           "label": "is rejected",           "value": "rejected"         },         {           "label": "needs clarification",           "value": "clarificationNeeded"         }       ],       "label": "This request",       "type": "select",       "id": "Field_151wuo9",       "key": "approvalResult",       "layout": {         "row": "Row_1sqpkdv"       }     },     {       "label": "Clarification comment",       "type": "textfield",       "id": "Field_0rskfbl",       "key": "clarificationCommentLineManager",       "description": "What needs to be clarified in order to process this request?",       "conditional": {         "hide": "=approvalResult != \"clarificationNeeded\""       },       "validate": {         "required": false       },       "layout": {         "row": "Row_1sn2ybg"       }     },     {       "label": "Rejection reason",       "type": "textfield",       "id": "Field_11dexzr",       "key": "rejectionReason",       "description": "Why is this request being rejected?",       "conditional": {         "hide": "=approvalResult != \"rejected\""       },       "validate": {         "required": false       },       "layout": {         "row": "Row_0k4h3z4"       }     }   ],   "schemaVersion": 11,   "exporter": {     "name": "Camunda Modeler",     "version": "5.16.0"   },   "type": "default",   "id": "Form_1a49c114-43ae-491a-8b1d-8be9956e8496",   "executionPlatform": "Camunda Cloud",   "executionPlatformVersion": "8.2.0" }</zeebe:userTaskForm>
      <zeebe:userTaskForm id="userTaskForm_2thhsc1">{ "components": [ { "text": "This is a notification that your absence request has been {{approvalResult}} by your line manager {{assignedLineManager}}.", "type": "text", "id": "Field_1imlq2e" }, { "label": "Rejection reason", "type": "textfield", "id": "Field_0roslog", "key": "rejectionReason", "description": "The rejection reason stated by your line manager", "conditional": { "hide": "=rejectionReason = \"\"" }, "disabled": true }, { "text": "You don't need to do anything here but completing the task.", "type": "text", "id": "Field_16eto3g" } ], "schemaVersion": 8, "exporter": { "name": "Camunda Web Modeler", "version": "a48d353" }, "type": "default", "id": "Form_05218fe1-7e95-4430-8387-d74c6dc7b58b", "executionPlatform": "Camunda Cloud", "executionPlatformVersion": "8.2.0" }</zeebe:userTaskForm>
    </bpmn:extensionElements>
    <bpmn:laneSet id="LaneSet_08mslvx">
      <bpmn:lane id="Lane_Employee" name="Employee">
        <bpmn:flowNodeRef>TimeOffNeededStartEvent</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>RequestAbsenceTask</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>GetNotification</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>ClarifyRequestTask</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_02m7n8y</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>GetLineManagerTask</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_LineManager" name="Line Manager">
        <bpmn:flowNodeRef>ApproveAbsenceTask</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_1pdgva1</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>LogAbsenceTask</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_1uhcky9</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_0zynvca</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>GetAndConfirmReminderTask</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_0sz0cst</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_0z73nuo</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>
    <bpmn:startEvent id="TimeOffNeededStartEvent" name="Time off&#10;needed">
      <bpmn:outgoing>Flow_15yg3k5</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="RequestAbsenceTask" name="Request absence">
      <bpmn:documentation>This task uses a Camunda form (see below). Forms can be created in the Modeler. To link a form to a user task, its JSON definition is copied into the corresonding configuration below. When executing the process, users can use Camunda Tasklist to view and edit data via this form.</bpmn:documentation>
      <bpmn:extensionElements>
        <zeebe:taskDefinition type="test-worker" retries="1" />
        <zeebe:formDefinition formKey="camunda-forms:bpmn:userTaskForm_0oc50o5" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_15yg3k5</bpmn:incoming>
      <bpmn:outgoing>Flow_0xnutez</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="ApproveAbsenceTask" name="Approve absence">
      <bpmn:extensionElements>
        <zeebe:assignmentDefinition assignee="=assignedLineManager" />
        <zeebe:formDefinition formKey="camunda-forms:bpmn:userTaskForm_0fptdc8" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_00xi8zy</bpmn:incoming>
      <bpmn:outgoing>Flow_0225a20</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_1pdgva1" name="Approval Result?">
      <bpmn:incoming>Flow_0225a20</bpmn:incoming>
      <bpmn:outgoing>Flow_1a3eadh</bpmn:outgoing>
      <bpmn:outgoing>Flow_1f7d78d</bpmn:outgoing>
      <bpmn:outgoing>Flow_1ynjfct</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:userTask id="LogAbsenceTask" name="Log absence in HR system">
      <bpmn:extensionElements>
        <zeebe:formDefinition formKey="camunda-forms:bpmn:userTaskForm_09t4jnc" />
        <zeebe:assignmentDefinition assignee="=assignedLineManager" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_1ynjfct</bpmn:incoming>
      <bpmn:outgoing>Flow_1cug0fm</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_1uhcky9">
      <bpmn:incoming>Flow_1a3eadh</bpmn:incoming>
      <bpmn:incoming>Flow_1cug0fm</bpmn:incoming>
      <bpmn:outgoing>Flow_1wt1dkc</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:userTask id="GetNotification" name="Get notification">
      <bpmn:extensionElements>
        <zeebe:formDefinition formKey="camunda-forms:bpmn:userTaskForm_2thhsc1" />
        <zeebe:assignmentDefinition assignee="=employeeName" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_1wt1dkc</bpmn:incoming>
      <bpmn:outgoing>Flow_1cusxs4</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:endEvent id="Event_0zynvca" name="Line manager reminded">
      <bpmn:incoming>Flow_07mywsg</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:userTask id="GetAndConfirmReminderTask" name="Get and confirm reminder">
      <bpmn:extensionElements>
        <zeebe:formDefinition formKey="camunda-forms:bpmn:userTaskForm_0dl4rab" />
        <zeebe:assignmentDefinition assignee="=assignedLineManager" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_1izp9te</bpmn:incoming>
      <bpmn:outgoing>Flow_07mywsg</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_0sz0cst">
      <bpmn:incoming>Flow_0axp5vf</bpmn:incoming>
      <bpmn:incoming>Flow_1d5wcnk</bpmn:incoming>
      <bpmn:outgoing>Flow_00xi8zy</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:userTask id="ClarifyRequestTask" name="Clarify&#10;request">
      <bpmn:extensionElements>
        <zeebe:formDefinition formKey="camunda-forms:bpmn:userTaskForm_080698f" />
        <zeebe:assignmentDefinition assignee="=employeeName" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_1f7d78d</bpmn:incoming>
      <bpmn:outgoing>Flow_0axp5vf</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:endEvent id="Event_02m7n8y" name="Employee notified">
      <bpmn:incoming>Flow_1cusxs4</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:scriptTask id="GetLineManagerTask" name="Get line manager">
      <bpmn:documentation>Each department has a line manager. This task uses a FEEL script to get the line manager of the employee. The result is stored in the variable "assignedLineManager". It is used to assign upcoming user tasks to the responsible line manager.</bpmn:documentation>
      <bpmn:extensionElements>
        <zeebe:script expression="= get value({&#34;sales&#34;: &#34;John&#34;, &#34;marketing&#34;: &#34;Paul&#34;, &#34;finance&#34;:&#34;George&#34;, &#34;it&#34;: &#34;Ringo&#34;}, department) " resultVariable="assignedLineManager" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_0xnutez</bpmn:incoming>
      <bpmn:outgoing>Flow_1d5wcnk</bpmn:outgoing>
    </bpmn:scriptTask>
    <bpmn:boundaryEvent id="Event_0z73nuo" name="Every 2 days" cancelActivity="false" attachedToRef="ApproveAbsenceTask">
      <bpmn:documentation>This timer triggers a reminder every two days.</bpmn:documentation>
      <bpmn:outgoing>Flow_1izp9te</bpmn:outgoing>
      <bpmn:timerEventDefinition id="TimerEventDefinition_0c27emr">
        <bpmn:timeCycle xsi:type="bpmn:tFormalExpression">R/P2D</bpmn:timeCycle>
      </bpmn:timerEventDefinition>
    </bpmn:boundaryEvent>
    <bpmn:sequenceFlow id="Flow_15yg3k5" sourceRef="TimeOffNeededStartEvent" targetRef="RequestAbsenceTask" />
    <bpmn:sequenceFlow id="Flow_0xnutez" sourceRef="RequestAbsenceTask" targetRef="GetLineManagerTask" />
    <bpmn:sequenceFlow id="Flow_00xi8zy" sourceRef="Gateway_0sz0cst" targetRef="ApproveAbsenceTask" />
    <bpmn:sequenceFlow id="Flow_0225a20" sourceRef="ApproveAbsenceTask" targetRef="Gateway_1pdgva1" />
    <bpmn:sequenceFlow id="Flow_1ynjfct" name="approved" sourceRef="Gateway_1pdgva1" targetRef="LogAbsenceTask">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">= approvalResult = "approved"</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_1f7d78d" name="clarification needed" sourceRef="Gateway_1pdgva1" targetRef="ClarifyRequestTask">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">= approvalResult = "clarificationNeeded"</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_1a3eadh" name="rejected" sourceRef="Gateway_1pdgva1" targetRef="Gateway_1uhcky9">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">= approvalResult = "rejected"</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_1cug0fm" sourceRef="LogAbsenceTask" targetRef="Gateway_1uhcky9" />
    <bpmn:sequenceFlow id="Flow_1wt1dkc" sourceRef="Gateway_1uhcky9" targetRef="GetNotification" />
    <bpmn:sequenceFlow id="Flow_1cusxs4" sourceRef="GetNotification" targetRef="Event_02m7n8y" />
    <bpmn:sequenceFlow id="Flow_07mywsg" sourceRef="GetAndConfirmReminderTask" targetRef="Event_0zynvca" />
    <bpmn:sequenceFlow id="Flow_1izp9te" sourceRef="Event_0z73nuo" targetRef="GetAndConfirmReminderTask" />
    <bpmn:sequenceFlow id="Flow_0axp5vf" sourceRef="ClarifyRequestTask" targetRef="Gateway_0sz0cst" />
    <bpmn:sequenceFlow id="Flow_1d5wcnk" sourceRef="GetLineManagerTask" targetRef="Gateway_0sz0cst" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="AbsenceRequestProcessPool">
      <bpmndi:BPMNShape id="Participant_056nh3b_di" bpmnElement="Participant_056nh3b" isHorizontal="true">
        <dc:Bounds x="159" y="80" width="1901" height="660" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0dur4gj_di" bpmnElement="Lane_LineManager" isHorizontal="true">
        <dc:Bounds x="189" y="356" width="1871" height="384" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0jbpf0w_di" bpmnElement="Lane_Employee" isHorizontal="true">
        <dc:Bounds x="189" y="80" width="1871" height="276" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="TimeOffNeededStartEvent">
        <dc:Bounds x="250" y="212" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="248" y="175" width="40" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0o4nisz_di" bpmnElement="RequestAbsenceTask">
        <dc:Bounds x="341" y="190" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1lb7152_di" bpmnElement="ApproveAbsenceTask">
        <dc:Bounds x="841" y="461" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1pdgva1_di" bpmnElement="Gateway_1pdgva1" isMarkerVisible="true">
        <dc:Bounds x="1246" y="476" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1170" y="474" width="83" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0pixets_di" bpmnElement="LogAbsenceTask">
        <dc:Bounds x="1421" y="461" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1uhcky9_di" bpmnElement="Gateway_1uhcky9" isMarkerVisible="true">
        <dc:Bounds x="1631" y="476" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0kl9uoy_di" bpmnElement="GetNotification">
        <dc:Bounds x="1781" y="190" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0zynvca_di" bpmnElement="Event_0zynvca">
        <dc:Bounds x="1162" y="633" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1146" y="676" width="69" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1561p8l_di" bpmnElement="GetAndConfirmReminderTask">
        <dc:Bounds x="1000" y="611" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0sz0cst_di" bpmnElement="Gateway_0sz0cst" isMarkerVisible="true">
        <dc:Bounds x="725" y="476" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1bx0fjx_di" bpmnElement="ClarifyRequestTask">
        <dc:Bounds x="1421" y="190" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_02m7n8y_di" bpmnElement="Event_02m7n8y">
        <dc:Bounds x="1943" y="212" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1917" y="255" width="88" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1tqap6e_di" bpmnElement="GetLineManagerTask">
        <dc:Bounds x="500" y="190" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1xxzzm1_di" bpmnElement="Event_0z73nuo">
        <dc:Bounds x="872" y="523" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="908" y="554" width="65" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_15yg3k5_di" bpmnElement="Flow_15yg3k5">
        <di:waypoint x="286" y="230" />
        <di:waypoint x="341" y="230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0xnutez_di" bpmnElement="Flow_0xnutez">
        <di:waypoint x="441" y="230" />
        <di:waypoint x="500" y="230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_00xi8zy_di" bpmnElement="Flow_00xi8zy">
        <di:waypoint x="764" y="490" />
        <di:waypoint x="841" y="490" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0225a20_di" bpmnElement="Flow_0225a20">
        <di:waypoint x="941" y="501" />
        <di:waypoint x="1246" y="501" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ynjfct_di" bpmnElement="Flow_1ynjfct">
        <di:waypoint x="1296" y="501" />
        <di:waypoint x="1421" y="501" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1324" y="483" width="46" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1f7d78d_di" bpmnElement="Flow_1f7d78d">
        <di:waypoint x="1271" y="476" />
        <di:waypoint x="1271" y="230" />
        <di:waypoint x="1421" y="230" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1312" y="244" width="56" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1a3eadh_di" bpmnElement="Flow_1a3eadh">
        <di:waypoint x="1271" y="526" />
        <di:waypoint x="1271" y="651" />
        <di:waypoint x="1656" y="651" />
        <di:waypoint x="1656" y="526" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1330" y="633" width="40" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1cug0fm_di" bpmnElement="Flow_1cug0fm">
        <di:waypoint x="1521" y="501" />
        <di:waypoint x="1631" y="501" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1wt1dkc_di" bpmnElement="Flow_1wt1dkc">
        <di:waypoint x="1681" y="501" />
        <di:waypoint x="1730" y="501" />
        <di:waypoint x="1730" y="230" />
        <di:waypoint x="1781" y="230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1cusxs4_di" bpmnElement="Flow_1cusxs4">
        <di:waypoint x="1881" y="230" />
        <di:waypoint x="1943" y="230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_07mywsg_di" bpmnElement="Flow_07mywsg">
        <di:waypoint x="1100" y="651" />
        <di:waypoint x="1162" y="651" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1izp9te_di" bpmnElement="Flow_1izp9te">
        <di:waypoint x="890" y="559" />
        <di:waypoint x="890" y="651" />
        <di:waypoint x="1000" y="651" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0axp5vf_di" bpmnElement="Flow_0axp5vf">
        <di:waypoint x="1521" y="230" />
        <di:waypoint x="1560" y="230" />
        <di:waypoint x="1560" y="140" />
        <di:waypoint x="750" y="140" />
        <di:waypoint x="750" y="476" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1d5wcnk_di" bpmnElement="Flow_1d5wcnk">
        <di:waypoint x="600" y="230" />
        <di:waypoint x="650" y="230" />
        <di:waypoint x="650" y="501" />
        <di:waypoint x="725" y="501" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`

const fetchData = async () => {
  try {
    const response = await axios.get('https://infinity-experiment.onrender.com/api/retriveRecords/1');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const Home = () => {

  const [data, setData] = useState(null);
  let some;
  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      if (result) {
        setData(result);
      }
    };

    getData();
    some = data;
  }, [some]);


  return (
    <>
      <div>
        <h1>BPMN Diagram</h1>
        {data ? (
          <Accordion defaultIndex={[0]} allowMultiple>
            {data.data.map((item, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' textColor={"black"}>
                      {item.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <h1>BPMN Diagram</h1>

                  <BpmnDiagram diagramXML={item.xml} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default Home;

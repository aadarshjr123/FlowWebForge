import xml.etree.ElementTree as ET

def extract_bpmn_info(xml_content):
    root = ET.fromstring(xml_content)

    # Extract process information
    process_id = root.find('.//{http://www.omg.org/spec/BPMN/20100524/MODEL}process').get('id')
    process_name = root.find('.//{http://www.omg.org/spec/BPMN/20100524/MODEL}process').get('name')

    # Extract flow nodes
    flow_nodes = {}
    for flow_node in root.findall('.//{http://www.omg.org/spec/BPMN/20100524/MODEL}flowNode'):
        flow_node_id = flow_node.get('id')
        flow_node_name = flow_node.get('name')
        flow_nodes[flow_node_id] = flow_node_name

    # Extract sequence flows
    sequence_flows = []
    for sequence_flow in root.findall('.//{http://www.omg.org/spec/BPMN/20100524/MODEL}sequenceFlow'):
        source_ref = sequence_flow.get('sourceRef')
        target_ref = sequence_flow.get('targetRef')
        sequence_flows.append((flow_nodes.get(source_ref, source_ref), flow_nodes.get(target_ref, target_ref)))

    return process_id, process_name, flow_nodes, sequence_flows

def generate_prompt(process_id, process_name, flow_nodes, sequence_flows):
    prompt = f"Analyse the BPMN process '{process_name}' (ID: {process_id}). Provide insights on the flow nodes: {', '.join(flow_nodes.values())}. Analyze the sequence flows: {', '.join([f'{source} -> {target}' for source, target in sequence_flows])}."
    return prompt

if __name__ == "__main__":
    with open("./testing.xml", "r") as file:
        xml_content = file.read()

    process_id, process_name, flow_nodes, sequence_flows = extract_bpmn_info(xml_content)
    generated_prompt = generate_prompt(process_id, process_name, flow_nodes, sequence_flows)

    print("Generated Prompt:")
    print(generated_prompt)

import xml.etree.ElementTree as ET

def extract_names(xml_content):
    root = ET.fromstring(xml_content)

    # Extract names of elements with non-empty strings
    names = [(element.tag.split('}')[-1], element.get('name')) for element in root.iter() if element.get('name') is not None and element.get('name').strip() != '']
    
    return names

if __name__ == "__main__":
    with open("./testing.xml", "r") as file:
        xml_content = file.read()

    names = extract_names(xml_content)

    data_list = []
    for tag_name, name_value in names:
        data_list.append(name_value)
    
    print(data_list)

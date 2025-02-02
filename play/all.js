//// main 

function box7 () {
    return `
#include "behaviortree_cpp_v3/bt_factory.h"

// file that contains the custom nodes definitions
#include "dummy_nodes.h"

int main()
{
  using namespace DummyNodes;

  BehaviorTreeFactory factory;

@

  auto tree = factory.createTreeFromFile("./my_tree.xml");

  tree.tickRoot();
  return 0;
}
`;
}

//// end main

/// class
function box915 () {
    return `
class @1 : public SyncActionNode
{
public:
  @1(const std::string& name, const NodeConfiguration& config)
    : SyncActionNode(name, config)
  {
  }

@2

@3
};
`
}

function box916 (attext, text) {
    return text.replace (/@1/g, attext)
}

function box914 (attext) {
    var konst = box915 ();
    var edit = box916 (attext, konst);
    return edit;
}

function box810 (component) {
    var selected = component.name;
    var r = box914 (selected);
    return r;
}

////// ports

function box24 (item) {
    var result = undefined;
    var text = box26 ();
    result = box25 (item, text);
    return result;
}

function box23 (list) {
    var result = [];
    list.forEach (item => {
        result.push (box24 (item)) 
    });
    return result.join ('\n');
}

function box22 (item) {
    var result = undefined;
    result = box23 (item.inputs);
    return result;
}

function box25 (at, text) {
    return text.replace (/@/g, at);
}

function box26 () {
    return `ports.insert( BT::InputPort<std::string>("@"));`;
}




function box74 (item) {
    var result = undefined;
    var text = box76 ();
    result = box75 (item, text);
    return result;
}

function box73 (list) {
    var result = [];
    list.forEach (item => {
        result.push (box74 (item)) 
    });
    return result.join ('\n');
}

function box72 (item) {
    var result = undefined;
    if (undefined !== item.outputs) {
    	result = box73 (item.outputs);
    	return result;
    } else {
    	console.error ('{} in components?');
    	throw "internal error";
    }

}

function box75 (at, text) {
    return text.replace (/@/g, at);
}

function box76 () {
    return `ports.insert( BT::OutputPort<std::string>("@"));`;
}

function box50 (A, B) {
    return A + B;
}

function box51 (attext, text) {
    return text.replace (/@/g, attext);
}

function box52 () {
    return `
static PortsList providedPorts () {
    PortsList ports;
    @
    return ports;
}
`;
}

function box21 (component) {
    var input_ports = box22 (component);
    var output_ports = box72 (component);
    var ports = box50 (input_ports, output_ports);
    var boilerplate = box52 ();
    var portdef = box51 (ports, boilerplate); 
    return portdef;
}

////////// end ports


////////// tick
function box932 (item) {
    var remove_nbsp = item.lines.replace (/ /g," ");
    var r = decodeURIComponent (remove_nbsp);
    return r;
}

////////// end tick

///////// for each component
function box150 (text, at2text) {
    return text.replace (/@2/g, at2text);
}

function box160 (text, at3text) {
    return text.replace (/@3/g, at3text);
}

function box180 (list) {
    var result = [];
    list.forEach (component => {
	if (undefined === component.outputs) {
	    console.error ("looks like {} is in component.json");
	    throw "null component";
	} else {
            var clss = box810(component);
	    var ports = box21 (component);
	    var tick = box932 (component);
	    var clssports = box150 (clss, ports);
	    var clssportstick = box160 (clssports, tick);
	    result.push (clssportstick);
	}
    });
    return result.join ('\n');
}
///////// end for each component


//////// top
function box170 (text, attext) {
    return text.replace (/@/g, attext);
}


fs = require ('fs');
var json_components = fs.readFileSync ('component.json', 'utf-8');
var components = JSON.parse (json_components);

var string_main = box7 (components);
var string_instances = box180 (components);
var string_joined = box170 (string_main, string_instances);

console.log (string_joined);


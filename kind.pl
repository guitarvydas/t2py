#!/usr/bin/env swipl
:- use_module(library(http/json)).
:- initialization allkind.

allkind:-
    consult(user),
    bagof([Node,Kind],kind(Node,Kind),Bag),
    current_output(Out),
    kind_format(Out, Bag, S),
    write(S),
    %json_write(Out, Bag, [width(128)]),
    halt.

    
kind_format(_, [], "").
kind_format(Out, [[H1,H2]|T], S):-
    format(string(S1),"treefact(kind, ~w, ~w).~n",[H1,H2]),
    kind_format(Out,T,S2),
    string_concat(S1,S2,S).

%% node {
%% shape     text      color
%% rectangle #sequence       -> sequence
%% rectangle #fallback       -> fallback
%% rectangle           red   -> syncnode
%% rectangle           gray  -> textbox
%% else                      -> asyncnode
%% }

kind(Node, sequence):-rectangle(Node),textSequence(Node).
kind(Node, fallback):-rectangle(Node),textFallback(Node).
kind(Node, syncnode):-rectangle(Node),textOther(Node),red(Node).
kind(Node, textbox):-rectangle(Node),textOther(Node),gray(Node).
kind(Node, asyncnode):-rectangle(Node),textOther(Node),colorOther(Node).

textSequence(Node):-name(Node,"#sequence").
textFallback(Node):-name(Node,"#fallback").
textOther(Node):- \+ textSequence(Node), \+ textFallback(Node).
red(Node):-diagram_fact(fillColor,Node,"#f8cecc").
gray(Node):-diagram_fact(fillColor,Node,"#f5f5f5").
colorOther(Node):- \+ red(Node), \+ gray(Node).

edge(Node):-vertex(Node), diagram_fact(edge,Node,_).
ellipse(Node):-vertex(Node), diagram_fact(ellipse,Node,_).
rectangle(Node):-vertex(Node),\+ edge(Node), \+ ellipse(Node).
vertex(Node):-diagram_fact(vertex,Node,_).

name(Node, Name):-diagram_fact(value, Node, Name).

#!/usr/bin/env swipl -q
:- use_module(library(http/json)).
:- initialization alltext.

alltext:-
    consult(user),
    bagof([Node,Text],text(Node,Text),Bag),
    current_output(Out),
    text_format(Out, Bag, S),
    write(S),
    halt.

    
text_format(_, [], "").
text_format(Out, [[H1,H2]|T], S):-
    format(string(S1),"treefact(textbox, ~w, 0).~ntreefact(str, ~w, ~q).~n",[H1,H1,H2]),
    text_format(Out,T,S2),
    string_concat(S1,S2,S).


import { IAction } from './IAction';
import { IHash } from './IHash';

export interface IType {
  fields?: IHash<INode>;
  input?: IHash<INode>;
  locals?: IHash<INode|any>;//if function here we just call it
  function?: any;
}

export interface INode {
  typeId: string;
  referenceId?: string;
}

const types: IHash<IType> = {
  'string.combine': {
    input: {
      'value1': {typeId: 'string'},
      'value2': {typeId: 'string'},
    },
    fields: {
      'result': {typeId: 'string'}
    },
    function: function(input: IHash<string>) {
      return input[('value1')] + input[('value2')];
    },
  },

  'bool.not': {
    input: {
      'value': {typeId: 'boolean'},
    },
    fields: {
      'result': {typeId: 'boolean'}
    },
    function: function(input: any) {
      return !input[('value')];
    },
  },

  'combine string': (<IType> {
    input: {
      'a': (<INode> {typeId: 'string', value: ''}),
      'b': (<INode> {typeId: 'string', value: ''}),
    },
    locals: {
      'combine': (<INode> {typeId: 'string'})
    },
    fields: {
      'result': (<INode> {typeId: 'string', referenceId: 'combine'}),
    } 
  }),

  'character': (<IType> {
    fields: {
      'name': (<INode> {typeId: 'string', value: 'New Character'}),
      'age': (<INode> {typeId: 'number', value: 99}),
      'status': (<INode> {typeId: 'bool', value: true}),
    },
  }),

  'characters': (<IType> {

    input: {
      'protagonist name': (<INode> {typeId: 'string'}),
    },

    locals: {
      'protagonist': (<INode> {
        typeId: 'character', 
        executionArgs: {
          'name': (<INode> { typeId: 'string', referenceId: 'protagonist name' }), 
        }
      }),

      'villan': (<INode> {
        typeId: 'character', 
        executionArgs: {
          'name': (<INode> {
            typeId: 'string', 
            referenceId: 'protagonist name'
          }) 
        }
      }),

    },

    fields: {
      'protagonist': (<INode>{typeId: 'character', referenceId: 'protagonist'}),
      'villan': (<INode>{typeId: 'character', referenceId: 'villan'}),
    }
  }),
}

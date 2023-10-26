import { FileUtils } from "../../src";
import * as assert from "assert";

describe(__filename, () => {

  test('should generate csv from string when data is not an array', () => {
    const csv = `name,lastname\ndata.name,data.lastname`
    const input = {
      data: {
        name: 'Juan',
        lastname: 'Perez'
      }
    }

    const output = FileUtils.generateCSV(csv, input)
    assert.strictEqual(output, 'name,lastname\nJuan,Perez')
  })

  test('should generate csv from string when data is an array', () => {
    const csv = `name,lastname\ndata.name,data.lastname`
    const input = [
      {
        data: {
          name: 'Juan1',
          lastname: 'Perez1'
        }
      },
      {
        data: {
          name: 'Juan2',
          lastname: 'Perez2'
        }
      },
      {
        data: {
          name: 'Juan3',
          lastname: 'Perez3'
        }
      }
    ]

    const output = FileUtils.generateCSV(csv, input)
    assert.strictEqual(output, 'name,lastname\nJuan1,Perez1\nJuan2,Perez2\nJuan3,Perez3')
  })

  test('should generate csv from string when data is an array and attributes are null', () => {
    const csv = `name,lastname\ndata.name,data.lastname`
    const input = [
      {
        data: {
          name: 'Juan1',
          lastname: 'Perez1'
        }
      },
      {
        data: {
          lastname: 'Perez2'
        }
      },
      {
        data: {
          name: 'Juan3',
          lastname: 'Perez3'
        }
      }
    ]

    const output = FileUtils.generateCSV(csv, input)
    assert.strictEqual(output, 'name,lastname\nJuan1,Perez1\n,Perez2\nJuan3,Perez3')
  })

})

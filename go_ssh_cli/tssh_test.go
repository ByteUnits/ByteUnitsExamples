package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"reflect"
	"testing"
)

func Test_addTemplate(t *testing.T) {
	filePath := "test.json"
	os.Create(filePath)

	type args struct {
		name    string
		command string
	}
	tests := []struct {
		name string
		args args
		want *sshTemplate
	}{
		{"testName", args{name: "testName", command: "testCommand"}, &sshTemplate{Name: "testName", Command: "testCommand"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := addTemplate(tt.args.name, tt.args.command, filePath); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("addTemplate() = %v, want %v", got, tt.want)
			}
		})
	}

	os.Remove(filePath)
}

func Test_removeTemplate(t *testing.T) {
	data := map[string]sshTemplate{"testName": {Name: "testName", Command: "testCommand"}}
	file, _ := json.MarshalIndent(data, "", " ")
	filePath := "test.json"
	os.Create(filePath)

	ioutil.WriteFile(filePath, file, 0644)

	type args struct {
		name string
	}
	tests := []struct {
		name string
		args args
		want *sshTemplate
	}{
		{"testName", args{name: "testName"}, &sshTemplate{Name: "testName", Command: "testCommand"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := removeTemplate(tt.args.name, filePath); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("removeTemplate() = %v, want %v", got, tt.want)
			}
		})
	}

	os.Remove(filePath)
}

func Test_readFromFile(t *testing.T) {
	data := map[string]sshTemplate{"testName": {Name: "testName", Command: "testCommand"}}
	file, _ := json.MarshalIndent(data, "", " ")
	filePath := "test.json"
	os.Create(filePath)

	ioutil.WriteFile(filePath, file, 0644)

	t.Run("test reading", func(t *testing.T) {
		if got := readFromFile(filePath); !reflect.DeepEqual(got, data) {
			t.Errorf("readFromFile() = %v, want %v", got, data)
		}
	})

	os.Remove(filePath)
}

func Test_writeToFile(t *testing.T) {
	data := map[string]sshTemplate{"testName": {Name: "testName", Command: "testCommand"}}
	filePath := "test.json"
	os.Create(filePath)

	t.Run("test writing", func(t *testing.T) {
		writeToFile(data, filePath)

		fileData, _ := ioutil.ReadFile(filePath)
		res := map[string]sshTemplate{}
		json.Unmarshal(fileData, &res)

		if !reflect.DeepEqual(res, data) {
			t.Errorf("writeToFile() = %v, want %v", res, data)
		}
	})

	os.Remove(filePath)
}

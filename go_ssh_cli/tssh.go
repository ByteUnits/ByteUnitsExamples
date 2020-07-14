// tssh.go

package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"syscall"

	"github.com/urfave/cli" // Library that adds useful utilities for handling command line arguments
)

// Struct for managing data
type sshTemplate struct {
	Name    string
	Command string
}

// Utility for handling errors
func check(e error) {
	if e != nil {
		panic(e)
	}
}

// Save a new template to a json file
func writeToFile(data map[string]sshTemplate, filePath string) {
	file, _ := json.MarshalIndent(data, "", " ")
	err := ioutil.WriteFile(filePath, file, 0644)
	check(err)
}

// Read from the json and parse a map of sshTemplate structs
func readFromFile(filePath string) map[string]sshTemplate {
	dat, err := ioutil.ReadFile(filePath)
	check(err)

	res := map[string]sshTemplate{}
	json.Unmarshal(dat, &res)

	return res
}

// Add a new sshTemplate struct and save it to the file
func addTemplate(name string, command string, filePath string) *sshTemplate {
	templateArray := readFromFile(filePath)

	newTemplate := sshTemplate{
		Name:    name,
		Command: command,
	}

	templateArray[name] = newTemplate

	writeToFile(templateArray, filePath)

	fmt.Println(fmt.Sprintf("New template '%s' added!", newTemplate.Name))
	return &newTemplate
}

// Remove a template from the json file
func removeTemplate(name string, filePath string) *sshTemplate {
	templateArray := readFromFile(filePath)

	template := templateArray[name]

	delete(templateArray, name)

	writeToFile(templateArray, filePath)

	fmt.Println(fmt.Sprintf("Template '%s' removed!", name))
	return &template
}

// Execute an ssh command based on saved data
func executeCommand(template sshTemplate) {
	fmt.Println("Executing SSH command for", template.Command)

	binary, lookErr := exec.LookPath("ssh")
	check(lookErr)

	args := []string{"ssh", template.Command}
	env := os.Environ()

	execErr := syscall.Exec(binary, args, env)
	check(execErr)
}

func main() {
	app := &cli.App{
		// With no other arguments assume that the input is a Name of a saved template
		// so load it from the file and execute the ssh command
		Action: func(c *cli.Context) error {
			argName := c.Args().First()

			a := readFromFile("tempData.json")
			template := a[argName]
			executeCommand(template)
			fmt.Println(template.Command)
			return nil
		},
		Commands: []*cli.Command{
			{
				Name:    "template",
				Aliases: []string{"t"},
				Usage:   "options for task templates",
				Subcommands: []*cli.Command{
					// tssh template add <name> <command>
					{
						Name:  "add",
						Usage: "add a new template",
						Action: func(c *cli.Context) error {
							name := c.Args().First()
							command := c.Args().Get(1)

							addTemplate(name, command, "tempData.json")

							return nil
						},
					},
					// tssh template remove <name> <command>
					{
						Name:  "remove",
						Usage: "remove an existing template",
						Action: func(c *cli.Context) error {
							name := c.Args().First()

							removeTemplate(name, "tempData.json")
							return nil
						},
					},
				},
			},
		},
	}

	// Run the application
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}

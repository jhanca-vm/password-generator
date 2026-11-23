package password

import (
	"bytes"
	"testing"
)

func TestGenerator_Generate(t *testing.T) {
	generator := NewGenerator()
	password, err := generator.Generate(&Rules{
		Length:            4,
		IncludesUppercase: true,
		IncludesLowercase: true,
		IncludesNumbers:   true,
		IncludesSymbols:   true,
	})

	if err != nil {
		t.Errorf("unexpected error: %v", err)
	}

	if len(password) != 4 {
		t.Errorf("length = %d, expected 4", len(password))
	}

	if !bytes.ContainsAny(password, uppercase) {
		t.Error("missing uppercase character")
	}

	if !bytes.ContainsAny(password, lowercase) {
		t.Error("missing lowercase character")
	}

	if !bytes.ContainsAny(password, numbers) {
		t.Error("missing number character")
	}

	if !bytes.ContainsAny(password, symbols) {
		t.Error("missing symbol character")
	}
}

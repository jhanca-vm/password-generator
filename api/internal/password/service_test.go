package password

import (
	"errors"
	"testing"
)

type stubGenerator struct {
	called bool
}

func (g *stubGenerator) Generate(*Rules) ([]byte, error) {
	g.called = true
	return nil, nil
}

func TestService_Generate_InvalidLength(t *testing.T) {
	for _, length := range []int{-1, 0, 3, 65} {
		generator := &stubGenerator{}
		service := NewService(generator)
		_, err := service.Generate(&Rules{Length: length})

		if !errors.Is(err, InvalidLength) {
			t.Fatalf(
				"length %d: expected %v, got %v",
				length,
				InvalidLength,
				err,
			)
		}

		if generator.called {
			t.Fatalf("length %d: generator should not be called", length)
		}
	}
}

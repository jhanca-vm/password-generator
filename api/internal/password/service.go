package password

import "errors"

var InvalidLength = errors.New(
	"Password length must be between 4 and 64 characters",
)

type Rules struct {
	Length            int  `json:"length"`
	IncludesUppercase bool `json:"includesUppercase"`
	IncludesLowercase bool `json:"includesLowercase"`
	IncludesNumbers   bool `json:"includesNumbers"`
	IncludesSymbols   bool `json:"includesSymbols"`
}

type Generator interface {
	Generate(r *Rules) ([]byte, error)
}

type Service struct {
	generator Generator
}

func NewService(g Generator) *Service {
	return &Service{generator: g}
}

func (s *Service) Generate(r *Rules) ([]byte, error) {
	if r.Length < 4 || r.Length > 64 {
		return nil, InvalidLength
	}

	return s.generator.Generate(r)
}

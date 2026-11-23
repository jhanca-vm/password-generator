package password

import (
	"crypto/rand"
	"math/big"
	mathrand "math/rand/v2"
	"strings"
)

const (
	uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	lowercase = "abcdefghijklmnopqrstuvwxyz"
	numbers   = "0123456789"
	symbols   = "!@#$%^&*()_+-=[]{}|;:,.<>?/\"\\~"
)

type generator struct{}

func NewGenerator() Generator {
	return generator{}
}

func (generator) Generate(r *Rules) ([]byte, error) {
	var charsets []string

	if r.IncludesUppercase {
		charsets = append(charsets, uppercase)
	}

	if r.IncludesLowercase {
		charsets = append(charsets, lowercase)
	}

	if r.IncludesNumbers {
		charsets = append(charsets, numbers)
	}

	if r.IncludesSymbols {
		charsets = append(charsets, symbols)
	}

	password := make([]byte, r.Length)

	for index, charset := range charsets {
		if err := setRandomChar(&password[index], charset); err != nil {
			return nil, err
		}
	}

	charset := strings.Join(charsets, "")

	for index := len(charsets); index < len(password); index++ {
		if err := setRandomChar(&password[index], charset); err != nil {
			return nil, err
		}
	}

	var seed [32]byte

	if _, err := rand.Read(seed[:]); err != nil {
		return nil, err
	}

	shuffler := mathrand.New(mathrand.NewChaCha8(seed))

	shuffler.Shuffle(len(password), func(i, j int) {
		password[i], password[j] = password[j], password[i]
	})

	return password, nil
}

func setRandomChar(target *byte, charset string) error {
	index, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))

	if err != nil {
		return err
	}

	*target = charset[index.Int64()]

	return nil
}

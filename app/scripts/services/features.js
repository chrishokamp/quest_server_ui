// represents the features available in QuEst
// http://www.quest.dcs.shef.ac.uk/quest_files/features_blackbox_baseline_17

angular.module('services')
.factory('features', ['$log', function($log) {
    return {
      allFeatures: [
        'number of tokens in the source sentence',
        'number of tokens in the target sentence',
        'average source token length',
        'LM probability of source sentence',
        'LM probability of target sentence',
        'number of occurrences of the target word within the target hypothesis (averaged for all words in the hypothesis - type/token ratio)',
        'average number of translations per source word in the sentence (as given by IBM 1 table thresholded such that prob(t|s) > 0.2)',
        'average number of translations per source word in the sentence (as given by IBM 1 table thresholded such that prob(t|s) > 0.01) weighted by the inverse frequency of each word in the source corpus',
        'percentage of unigrams in quartile 1 of frequency (lower frequency words) in a corpus of the source language (SMT training corpus)',
        'percentage of unigrams in quartile 4 of frequency (higher frequency words) in a corpus of the source language',
        'percentage of bigrams in quartile 1 of frequency of source words in a corpus of the source language',
        'percentage of bigrams in quartile 4 of frequency of source words in a corpus of the source language',
        'percentage of trigrams in quartile 1 of frequency of source words in a corpus of the source language',
        'percentage of trigrams in quartile 4 of frequency of source words in a corpus of the source language',
        'percentage of unigrams in the source sentence seen in a corpus (SMT training corpus)',
        'number of punctuation marks in the source sentence',
        'number of punctuation marks in the target sentence '
      ]
    }
// FEATURES: dies ist ein Test Satz        This is a test set      5.0     5.0     3.6     -14.356393      -13.373941      1.0     9.4     0.0014826923    0.0   1.0      0.0     0.75    0.0     0.6666667       1.0     0.0     0.0
}]);

//number of tokens in the source sentence
//number of tokens in the target sentence
//average source token length
//LM probability of source sentence
//LM probability of target sentence
//number of occurrences of the target word within the target hypothesis (averaged for all words in the hypothesis - type/token ratio)
//average number of translations per source word in the sentence (as given by IBM 1 table thresholded such that prob(t|s) > 0.2)
//average number of translations per source word in the sentence (as given by IBM 1 table thresholded such that prob(t|s) > 0.01) weighted by the inverse frequency of each word in the source corpus
//percentage of unigrams in quartile 1 of frequency (lower frequency words) in a corpus of the source language (SMT training corpus)
//percentage of unigrams in quartile 4 of frequency (higher frequency words) in a corpus of the source language
//percentage of bigrams in quartile 1 of frequency of source words in a corpus of the source language
//percentage of bigrams in quartile 4 of frequency of source words in a corpus of the source language
//percentage of trigrams in quartile 1 of frequency of source words in a corpus of the source language
//percentage of trigrams in quartile 4 of frequency of source words in a corpus of the source language
//percentage of unigrams in the source sentence seen in a corpus (SMT training corpus)
//number of punctuation marks in the source sentence
//number of punctuation marks in the target sentence